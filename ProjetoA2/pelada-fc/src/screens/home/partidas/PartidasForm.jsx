import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput, Modal, Portal, Card, Checkbox, IconButton } from 'react-native-paper'; 
import PartidasService from './PartidasService';
import JogadoresService from '../jogadores/JogadoresService'; 

export default function PartidasForm({ navigation, route }) {
  const partidaAntigo = route.params || {};

  const [nome, setNome] = useState(partidaAntigo.nome || '');
  const [hora, setHora] = useState(partidaAntigo.hora || '');
  const [local, setLocal] = useState(partidaAntigo.local || '');
  const [data, setData] = useState(partidaAntigo.data || '');
  const [jogadoresPorTime, setJogadoresPorTime] = useState(String(partidaAntigo.jogadoresPorTime || ''));
  const [obs, setObs] = useState(partidaAntigo.obs || '');
  const [tipo, setTipo] = useState(partidaAntigo.tipo || '');

  const [jogadoresGlobais, setJogadoresGlobais] = useState([]);
  const [jogadoresSelecionadosIds, setJogadoresSelecionadosIds] = useState(partidaAntigo.jogadoresAssociados || []);
  const [showJogadoresModal, setShowJogadoresModal] = useState(false);

  useEffect(() => {
    carregarJogadoresGlobais();
  }, []);

  async function carregarJogadoresGlobais() {
    const lista = await JogadoresService.listar();
    setJogadoresGlobais(lista);
  }

  function handleSelectJogador(jogadorId) {
    setJogadoresSelecionadosIds(prev =>
      prev.includes(jogadorId)
        ? prev.filter(id => id !== jogadorId)
        : [...prev, jogadorId]
    );
  }

  async function salvar() {
    const partida = {
      nome,
      hora,
      local,
      data,
      jogadoresPorTime: parseInt(jogadoresPorTime),
      obs,
      tipo,
      jogadoresAssociados: jogadoresSelecionadosIds, 
    };

    if (!partida.nome || !partida.hora || !partida.local || !partida.data || !partida.jogadoresPorTime || !partida.tipo) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (partidaAntigo.id) {
      partida.id = partidaAntigo.id;
      await PartidasService.atualizar(partida);
      alert('Partida atualizada com sucesso!');
    } else {
      await PartidasService.salvar(partida);
      alert('Partida cadastrada com sucesso!');
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'PartidasLista' }],
    });
  }

  return (
    <View style={styles.container}>
      <Text variant='headlineLarge'>Cadastro de Partidas</Text>

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
        placeholder='00:00'
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
        label='Quantidade de Jogadores por Time'
        style={styles.input}
        mode='outlined'
        value={jogadoresPorTime}
        onChangeText={(text) => {
          const numericValue = parseInt(text.replace(/[^0-9]/g, '')) || 0;
          if (numericValue <= 11) {
            setJogadoresPorTime(numericValue.toString());
          } else {
            setJogadoresPorTime('11');
          }
        }}
        keyboardType='numeric'
        placeholder='Ex: 7'
        render={(props) => (
          <TextInputMask
            {...props}
            type={'custom'}
            options={{
              mask: '99',
            }}
          />
        )}
      />

      <TextInput
        label='Data da Partida'
        style={styles.input}
        mode='outlined'
        value={data}
        onChangeText={setData}
        keyboardType='numeric'
        placeholder='01/01/2000'
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

      <TextInput
        label='Observações'
        style={styles.input}
        mode='outlined'
        value={obs}
        onChangeText={setObs}
      />
      <TextInput
        label='Tipo de jogo'
        style={styles.input}
        mode='outlined'
        value={tipo}
        onChangeText={setTipo}
      />

      <Button
        style={styles.input}
        mode='outlined'
        onPress={() => setShowJogadoresModal(true)}
        icon='account-group'
      >
        Selecionar Jogadores ({jogadoresSelecionadosIds.length})
      </Button>

      <Portal>
        <Modal visible={showJogadoresModal} onDismiss={() => setShowJogadoresModal(false)} contentContainerStyle={styles.modalContainer}>
          <Text variant='titleLarge' style={styles.modalTitle}>Selecione os Jogadores</Text>
          <FlatList
            data={jogadoresGlobais}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.jogadorCard}>
                <TouchableOpacity
                  onPress={() => handleSelectJogador(item.id)}
                  style={styles.jogadorCardContent}
                >
                  <Checkbox
                    status={jogadoresSelecionadosIds.includes(item.id) ? 'checked' : 'unchecked'}
                    onPress={() => handleSelectJogador(item.id)}
                  />
                  <Text style={styles.jogadorCardText}>{item.nome} ({item.apelido})</Text>
                </TouchableOpacity>
              </Card>
            )}
          />
          <Button mode='contained' onPress={() => setShowJogadoresModal(false)} style={styles.modalCloseButton}>
            Fechar
          </Button>
        </Modal>
      </Portal>


      <Button
        style={styles.input}
        mode='contained'
        onPress={salvar}
      >
        Salvar
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    marginBottom: 10
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  jogadorCard: {
    marginVertical: 5,
    elevation: 2,
  },
  jogadorCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  jogadorCardText: {
    marginLeft: 10,
    flexShrink: 1, 
  },
  modalCloseButton: {
    marginTop: 20,
  }
});