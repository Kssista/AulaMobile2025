import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Text, IconButton, Dialog, Portal } from 'react-native-paper';
import JogadoresService from './JogadoresService';
import PartidasService from '../../home/partidas/PartidasService'; 
import { useIsFocused } from '@react-navigation/native';

export default function JogadoresLista({ navigation }) {
  const [jogadores, setJogadores] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [jogadorToDelete, setJogadorToDelete] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      buscarJogadores();
    }
  }, [isFocused]);

  async function buscarJogadores() {
    const listaJogadores = await JogadoresService.listar();
    setJogadores(listaJogadores);
  }

  function handleExcluirJogador(id) {
    setJogadorToDelete(id);
    setShowDialog(true);
  }

  async function confirmarExclusao() {
    await JogadoresService.remover(jogadorToDelete);
    buscarJogadores();
    alert('Jogador excluído com sucesso!');
    setShowDialog(false);
    setJogadorToDelete(null);
  }

  function cancelarExclusao() {
    setShowDialog(false);
    setJogadorToDelete(null);
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.addButton}
        mode='contained'
        icon='plus'
        onPress={() => navigation.navigate('JogadoresForm')}
      >
        Cadastrar Jogador
      </Button>

      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>ID: {item.id}</Text>
              <Text>Nome: {item.nome}</Text>
              <Text>Posição: {item.posicao}</Text>
              <Text>Contato: {item.contato}</Text>
              <Text>Nível: {item.nivel}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil'
                onPress={() => navigation.navigate('JogadoresForm', item)}
              />
              <IconButton
                icon='trash-can'
                onPress={() => handleExcluirJogador(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />

      <Portal>
        <Dialog visible={showDialog} onDismiss={cancelarExclusao}>
          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
          <Dialog.Content>
            <Text>Tem certeza que deseja excluir este jogador?</Text>
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
});