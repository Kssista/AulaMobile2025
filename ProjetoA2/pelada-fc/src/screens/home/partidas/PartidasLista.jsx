import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Text, IconButton } from 'react-native-paper'
import PartidasService from './PartidasService';

export default function PartidasLista({ navigation, route }) {

  const [partidas, setPartidas] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      buscarPartidas();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    buscarPartidas()
  }, [])

  async function buscarPartidas() {
    const listaPartidas = await PartidasService.listar()
    setPartidas(listaPartidas)
  }

  async function excluirPartida(id) {
    await PartidasService.remover(id)
    buscarPartidas()
    alert('Partida excluída com sucesso!') 
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          mode='contained'
          icon='plus'
          onPress={() => navigation.navigate('PartidasForm')}
        >
          Cadastrar Nova Partida
        </Button>
        
      </View>


      <FlatList
        data={partidas}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text>Hora: {item.hora}</Text>
              <Text>Qtd de Jogadores: {item.jogadores}</Text>
              <Text>Local: {item.local}</Text>
              <Text>Data: {item.data}</Text>
              <Text>Observações: {item.obs}</Text>
              <Text>Tipo de Jogo: {item.tipo}</Text>
              {item.placar && item.placar.partidaFinalizada && (
                <View style={styles.finalizedPlacar}>
                  <Text style={styles.finalizedPlacarText}>Placar Final: {item.placar.timeCasaGols} X {item.placar.timeForaGols}</Text>
                  <Text style={styles.finalizedPlacarSubtext}>Salvo em: {new Date(item.placar.dataSalvamento).toLocaleDateString()}</Text>
                </View>
              )}
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <IconButton
                icon="pencil"
                color="blue"
                onPress={() => navigation.navigate('PartidasForm', item)}
              />
              <IconButton
                icon="scoreboard"
                color="green"
                onPress={() => navigation.navigate('PlacarScreen', { partidaId: item.id })}
              />
              <IconButton
                icon="delete"
                color="red"
                onPress={() => excluirPartida(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
  },
  card: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  finalizedPlacar: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#e0ffe0',
    borderRadius: 5,
  },
  finalizedPlacarText: {
    fontWeight: 'bold',
    color: '#2e7d32',
    fontSize: 16,
  },
  finalizedPlacarSubtext: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
});