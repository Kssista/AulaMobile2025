import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Text, IconButton, Dialog, Portal } from 'react-native-paper'
import PartidasService from './PartidasService'
import JogadoresService from '../jogadores/JogadoresService';
import { useIsFocused } from '@react-navigation/native'

export default function PartidasLista({ navigation, route }) {
  const [partidas, setPartidas] = useState([])
  const [showDialog, setShowDialog] = useState(false);
  const [partidaToDelete, setPartidaToDelete] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      buscarPartidas();
    }
  }, [isFocused]);

  async function buscarPartidas() {
    const listaPartidas = await PartidasService.listar();
    const jogadoresGlobais = await JogadoresService.listar();

    const partidasComNomesJogadores = listaPartidas.map(partida => {
      const nomesJogadores = partida.jogadoresAssociados
        ? partida.jogadoresAssociados.map(jogadorId => {
            const jogador = jogadoresGlobais.find(j => j.id === jogadorId);
            return jogador ? jogador.apelido || jogador.nome : 'Jogador Desconhecido';
          }).join(', ')
        : 'Nenhum jogador associado';
      return { ...partida, nomesJogadores };
    });

    setPartidas(partidasComNomesJogadores);
  }

  function handleExcluirPartida(id) {
    setPartidaToDelete(id);
    setShowDialog(true);
  }

  async function confirmarExclusao() {
    await PartidasService.remover(partidaToDelete);
    buscarPartidas();
    alert('Partida excluída com sucesso!');
    setShowDialog(false);
    setPartidaToDelete(null);
  }

  function cancelarExclusao() {
    setShowDialog(false);
    setPartidaToDelete(null);
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.addButton}
        mode='contained'
        icon='plus'
        onPress={() => navigation.navigate('PartidasForm')}
      >
        Cadastrar Partida
      </Button>

      <FlatList
        data={partidas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>ID: {item.id}</Text>
              <Text>Nome: {item.nome}</Text>
              <Text>Hora: {item.hora}</Text>
              <Text>Qtd de Jogadores por Time: {item.jogadoresPorTime}</Text>
              <Text>Local: {item.local}</Text>
              <Text>Data: {item.data}</Text>
              <Text>Observações: {item.obs}</Text>
              <Text>Tipo de Jogo: {item.tipo}</Text>
              <Text>Jogadores Associados: {item.nomesJogadores}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil'
                onPress={() => navigation.navigate('PartidasForm', item)}
              />
              <IconButton
                icon='trash-can'
                onPress={() => handleExcluirPartida(item.id)}
              />
              <Button
                mode="outlined"
                icon="dice-multiple"
                onPress={() => navigation.navigate('SorteioScreen', { partida: item })}
                style={styles.sortButton}
                disabled={!item.jogadoresAssociados || item.jogadoresAssociados.length < 2}
              >
                Sortear
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Portal>
        <Dialog visible={showDialog} onDismiss={cancelarExclusao}>
          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
          <Dialog.Content>
            <Text>Tem certeza que deseja excluir esta partida?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelarExclusao}>Cancelar</Button>
            <Button onPress={confirmarExclusao}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    margin: 10,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 2,
  },
  sortButton: {
    marginLeft: 'auto',
    marginRight: 8,
  }
});