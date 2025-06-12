// src/screens/home/partidas/PartidasForm.jsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput, Card, Checkbox, Dialog, Portal, List } from 'react-native-paper';
import JogadoresService from '../jogadores/JogadoresService';
import PartidasService from './PartidasService';

export default function PartidasForm({ navigation, route }) {
  const partidaAntigo = route.params || {};

  const [nome, setNome] = useState(partidaAntigo.nome || '');
  const [hora, setHora] = useState(partidaAntigo.hora || '');
  const [local, setLocal] = useState(partidaAntigo.local || '');
  const [data, setData] = useState(partidaAntigo.data || '');
  const [obs, setObs] = useState(partidaAntigo.obs || '');
  const [tipo, setTipo] = useState(partidaAntigo.tipo || '');

  const [jogadoresDisponiveis, setJogadoresDisponiveis] = useState([]);
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState(partidaAntigo.jogadoresParticipantes || []);

  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    async function carregarJogadores() {
      const listaJogadores = await JogadoresService.listar();
      setJogadoresDisponiveis(listaJogadores);
    }
    carregarJogadores();
  }, []);

  function toggleJogadorSelecao(jogador) {
    const isSelected = jogadoresSelecionados.some(j => j.id === jogador.id);
    if (isSelected) {
      setJogadoresSelecionados(prev => prev.filter(j => j.id !== jogador.id));
    } else {
      setJogadoresSelecionados(prev => [...prev, jogador]);
    }
  }

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const getSelectedPlayersText = () => {
    if (jogadoresSelecionados.length === 0) {
      return '-- Selecione os Jogadores --';
    }
    if (jogadoresSelecionados.length <= 3) {
      return jogadoresSelecionados.map(j => j.nome).join(', ');
    }
    return `${jogadoresSelecionados.length} jogadores selecionados`;
  };

  async function salvar() {
    const partida = {
      nome,
      hora,
      local,
      data,
      jogadores: jogadoresSelecionados.length,
      obs,
      tipo,
      jogadoresParticipantes: jogadoresSelecionados,
    };

    if (!partida.nome || !partida.hora || !partida.local || !partida.data || partida.jogadores === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios e selecione pelo menos um jogador!');
      return;
    }

    try {
      if (partidaAntigo.id) {
        partida.id = partidaAntigo.id;
        await PartidasService.atualizar(partida);
        Alert.alert('Sucesso!', 'Partida atualizada com sucesso!');
      } else {
        await PartidasService.salvar(partida);
        Alert.alert('Sucesso!', 'Partida cadastrada com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar partida:", error);
      Alert.alert("Erro", "Erro ao salvar partida. Tente novamente.");
    }
  }

  return (
    <Portal.Host>
      <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {partidaAntigo.id ? 'Editar Partida' : 'Cadastrar Partida'}
        </Text>

        <TextInput
          label='Nome da Partida'
          style={styles.input}
          mode='outlined'
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          label='Hora da Partida'
          style={styles.input}
          mode='outlined'
          value={hora}
          onChangeText={setHora}
          keyboardType='numeric'
          placeholder='HH:MM'
          render={(props) => (
            <TextInputMask
              {...props}
              type={'datetime'}
              options={{
                format: 'HH:MM'
              }}
            />
          )}
        />

        <TextInput
          label='Local da Partida'
          style={styles.input}
          mode='outlined'
          value={local}
          onChangeText={setLocal}
        />

        <TextInput
          label='Data da Partida'
          style={styles.input}
          mode='outlined'
          value={data}
          onChangeText={setData}
          keyboardType='numeric'
          placeholder='DD/MM/AAAA'
          render={(props) => (
            <TextInputMask
              {...props}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
            />
          )}
        />

        <Text style={styles.sectionTitle}>Jogadores da Partida ({jogadoresSelecionados.length} selecionados):</Text>
        <Button
          mode="outlined"
          onPress={showDialog}
          style={styles.dropdownButton}
          labelStyle={styles.dropdownButtonLabel}
          contentStyle={styles.dropdownButtonContent}
        >
          <Text>{getSelectedPlayersText()}</Text>
        </Button>

        <TextInput
          label='Observações'
          style={styles.input}
          mode='outlined'
          value={obs}
          onChangeText={setObs}
        />

        <TextInput
          label='Tipo de Jogo (Ex: Futebol de Campo, Futsal)'
          style={styles.input}
          mode='outlined'
          value={tipo}
          onChangeText={setTipo}
        />

        <Button
          style={styles.button}
          mode='contained'
          onPress={salvar}
        >
          Salvar
        </Button>

        <Button
          style={styles.button}
          mode='outlined'
          onPress={() => navigation.goBack()}
        >
          Cancelar
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Selecionar Jogadores</Dialog.Title>
          <Dialog.Content style={{ maxHeight: 400 }}>
            <ScrollView>
              {jogadoresDisponiveis.length === 0 ? (
                <Text style={styles.noPlayersText}>Nenhum jogador cadastrado. Cadastre jogadores para selecioná-los.</Text>
              ) : (
                jogadoresDisponiveis.map((jogador) => {
                  const isSelected = jogadoresSelecionados.some(j => j.id === jogador.id);
                  return (
                    <List.Item
                      key={jogador.id}
                      title={jogador.nome}
                      left={() => (
                        <Checkbox
                          status={isSelected ? 'checked' : 'unchecked'}
                          onPress={() => toggleJogadorSelecao(jogador)}
                          color="#4CAF50"
                        />
                      )}
                      onPress={() => toggleJogadorSelecao(jogador)}
                      style={isSelected ? styles.selectedPlayerItem : null}
                      titleStyle={isSelected ? styles.selectedPlayerItemText : null}
                    />
                  );
                })
              )}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },
  dropdownButton: {
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dropdownButtonContent: {
    justifyContent: 'flex-start',
    height: 50,
  },
  dropdownButtonLabel: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    paddingLeft: 0,
  },
  noPlayersText: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  selectedPlayerItem: {
    backgroundColor: '#e8f5e9',
  },
  selectedPlayerItemText: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 8,
  },
});