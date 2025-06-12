// src/screens/home/partidas/PlacarScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, ScrollView } from 'react-native'; // Importar ScrollView
import { Text, Button, Card, IconButton, Dialog, Portal, List } from 'react-native-paper'; // Importar Dialog, Portal, List
import PartidasService from './PartidasService';
import JogadoresService from '../jogadores/JogadoresService';
// REMOVIDO: import { Picker } from '@react-native-picker/picker';

export default function PlacarScreen({ navigation, route }) {
  const { partidaId } = route.params;
  const [partida, setPartida] = useState(null);
  const [timeCasaGols, setTimeCasaGols] = useState(0);
  const [timeForaGols, setTimeForaGols] = useState(0);
  const [golsRegistrados, setGolsRegistrados] = useState([]);
  const [autorGolId, setAutorGolId] = useState('selecione'); // Agora armazenamos o ID do jogador
  const [jogadores, setJogadores] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false); // Estado para controlar a visibilidade do Dialog

  useEffect(() => {
    async function carregarPartida() {
      const partidaAtual = await PartidasService.buscar(partidaId);
      setPartida(partidaAtual);
      if (partidaAtual.placar) {
        setTimeCasaGols(partidaAtual.placar.timeCasaGols);
        setTimeForaGols(partidaAtual.placar.timeForaGols);
        setGolsRegistrados(partidaAtual.placar.golsRegistrados || []);
      }
    }
    carregarPartida();
    carregarJogadores();
  }, [partidaId]);

  async function carregarJogadores() {
    const listaJogadores = await JogadoresService.listar();
    setJogadores(listaJogadores);
  }

  const handleGol = async (time) => {
    if (!autorGolId || autorGolId === 'selecione') {
      Alert.alert("Erro", "Por favor, selecione o autor do gol.");
      return;
    }

    const jogadorSelecionado = jogadores.find(j => j.id === autorGolId);
    if (!jogadorSelecionado) {
      Alert.alert("Erro", "Jogador selecionado não encontrado.");
      return;
    }

    const novoGolRegistrado = {
      id: new Date().getTime(),
      autorNome: jogadorSelecionado.nome, // Armazenamos o nome do jogador
      autorId: jogadorSelecionado.id, // Armazenamos o ID do jogador
      time: time,
      timestamp: new Date().toLocaleString(),
    };

    const novosGolsRegistrados = [...golsRegistrados, novoGolRegistrado];
    setGolsRegistrados(novosGolsRegistrados);

    if (time === 'casa') {
      setTimeCasaGols(prev => prev + 1);
    } else {
      setTimeForaGols(prev => prev + 1);
    }

    setAutorGolId('selecione'); // Reseta a seleção após o gol
  };

  const removerGol = (idGol, time) => {
    Alert.alert(
      "Remover Gol",
      "Tem certeza que deseja remover este gol?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Remover",
          onPress: () => {
            const golsAtualizados = golsRegistrados.filter(gol => gol.id !== idGol);
            setGolsRegistrados(golsAtualizados);

            if (time === 'casa') {
              setTimeCasaGols(prev => prev - 1);
            } else {
              setTimeForaGols(prev => prev - 1);
            }
          }
        }
      ]
    );
  };

  const salvarPlacar = async () => {
    if (!partida) return;

    if (partida.placar && partida.placar.partidaFinalizada) {
      Alert.alert("Atenção", "O resultado desta partida já foi salvo e não pode ser alterado.");
      return;
    }

    const placar = {
      timeCasaGols,
      timeForaGols,
      golsRegistrados,
      partidaFinalizada: true,
      dataSalvamento: new Date().toISOString(),
    };

    const partidaAtualizada = { ...partida, placar: placar };
    await PartidasService.atualizar(partidaAtualizada);

    Alert.alert("Sucesso", "Resultado da partida salvo com sucesso!");
    navigation.goBack();
  };

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  // Encontra o nome do jogador selecionado para exibir no botão
  const nomeAutorGolSelecionado = jogadores.find(j => j.id === autorGolId)?.nome || '-- Selecione o Jogador --';

  if (!partida) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando partida...</Text>
      </View>
    );
  }

  // Componente de Cabeçalho da FlatList (conteúdo acima dos gols)
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Placar da Partida: {partida.nome}</Text>

      <View style={styles.placarContainer}>
        <View style={styles.timePlacar}>
          <Text style={styles.timeNome}>{partida.nomeTimeCasa || 'Time da Casa'}</Text>
          <Text style={styles.gols}>{timeCasaGols}</Text>
        </View>
        <Text style={styles.vs}>X</Text>
        <View style={styles.timePlacar}>
          <Text style={styles.timeNome}>{partida.nomeTimeFora || 'Time de Fora'}</Text>
          <Text style={styles.gols}>{timeForaGols}</Text>
        </View>
      </View>

      <View style={styles.inputGolContainer}>
        <Text style={styles.pickerLabel}>Autor do Gol:</Text>
        <Button
          mode="outlined"
          onPress={showDialog}
          disabled={partida.placar && partida.placar.partidaFinalizada}
          style={styles.dropdownButton}
          labelStyle={styles.dropdownButtonLabel}
          contentStyle={styles.dropdownButtonContent}
        >
          {nomeAutorGolSelecionado}
        </Button>

        <View style={styles.buttonGolContainer}>
          <Button
            mode="contained"
            onPress={() => handleGol('casa')}
            disabled={autorGolId === 'selecione' || (partida.placar && partida.placar.partidaFinalizada)}
            style={styles.buttonGol}
          >
            Gol {partida.nomeTimeCasa || 'Casa'}
          </Button>
          <Button
            mode="contained"
            onPress={() => handleGol('fora')}
            disabled={autorGolId === 'selecione' || (partida.placar && partida.placar.partidaFinalizada)}
            style={styles.buttonGol}
          >
            Gol {partida.nomeTimeFora || 'Fora'}
          </Button>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Histórico de Gols:</Text>
      {golsRegistrados.length === 0 && (
        <Text style={styles.noGoals}>Nenhum gol registrado ainda.</Text>
      )}
    </View>
  );

  // Componente de Rodapé da FlatList (conteúdo abaixo dos gols)
  const ListFooter = () => (
    <Button
      mode="contained"
      onPress={salvarPlacar}
      style={styles.saveButton}
      disabled={partida.placar && partida.placar.partidaFinalizada}
    >
      {partida.placar && partida.placar.partidaFinalizada ? 'Resultado Já Salvo (Não Editável)' : 'Salvar Resultado Final'}
    </Button>
  );


  return (
    <Portal.Host> {/* O Portal.Host é necessário para que o Dialog seja renderizado corretamente */}
      <FlatList
        data={golsRegistrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.golItem}>
            <Card.Content>
              <View style={styles.golItemContent}>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>{item.autorNome}</Text> marcou para o time{' '}
                  <Text style={{ fontWeight: 'bold' }}>
                    {item.time === 'casa' ? (partida.nomeTimeCasa || 'Casa') : (partida.nomeTimeFora || 'Fora')}
                  </Text>
                </Text>
                <Text style={styles.golTimestamp}>{item.timestamp}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="delete"
                color="red"
                size={20}
                onPress={() => removerGol(item.id, item.time)}
                disabled={partida.placar && partida.placar.partidaFinalizada}
              />
            </Card.Actions>
          </Card>
        )}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.flatListContent}
        style={styles.container}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Selecionar Autor do Gol</Dialog.Title>
          <Dialog.Content style={{ maxHeight: 300 }}> {/* Limita a altura do conteúdo do dialog */}
            <ScrollView>
              {jogadores.length === 0 ? (
                <Text style={styles.noPlayersText}>Nenhum jogador cadastrado.</Text>
              ) : (
                jogadores.map((jogador) => (
                  <List.Item
                    key={jogador.id}
                    title={jogador.nome}
                    onPress={() => {
                      setAutorGolId(jogador.id);
                      hideDialog();
                    }}
                    style={jogador.id === autorGolId ? styles.selectedPlayerItem : null}
                    titleStyle={jogador.id === autorGolId ? styles.selectedPlayerItemText : null}
                  />
                ))
              )}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatListContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  placarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  timePlacar: {
    alignItems: 'center',
  },
  timeNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  gols: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  vs: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#777',
  },
  inputGolContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  dropdownButton: {
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownButtonContent: {
    justifyContent: 'flex-start', // Alinha o texto à esquerda
    height: 50, // Altura padrão do picker
  },
  dropdownButtonLabel: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    paddingLeft: 0,
  },
  buttonGolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonGol: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  golItem: {
    marginBottom: 10,
    backgroundColor: '#e8f5e9',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  golItemContent: {
    flex: 1,
  },
  golTimestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  noGoals: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
    marginBottom: 10,
  },
  noPlayersText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
  },
  selectedPlayerItem: {
    backgroundColor: '#e0e0e0', // Cor de fundo para o item selecionado no dialog
  },
  selectedPlayerItemText: {
    fontWeight: 'bold', // Texto em negrito para o item selecionado
  },
  saveButton: {
    marginTop: 30,
    paddingVertical: 15,
    backgroundColor: '#2196F3',
  },
});