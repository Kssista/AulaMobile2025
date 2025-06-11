import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { Button, Text, Card, List, Divider, Chip } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import JogadoresService from '../jogadores/JogadoresService';

export default function SorteioScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { partida } = route.params || {};
  
  const [jogadoresDaPartida, setJogadoresDaPartida] = useState([]);
  const [timeA, setTimeA] = useState([]);
  const [timeB, setTimeB] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarJogadores() {
      if (partida && partida.jogadoresAssociados && partida.jogadoresAssociados.length > 0) {
        setLoading(true);
        try {
          const todosJogadores = await JogadoresService.listar();
          const jogadoresDetalhes = partida.jogadoresAssociados.map(jogadorId => 
            todosJogadores.find(j => j.id === jogadorId)
          ).filter(Boolean);

          setJogadoresDaPartida(jogadoresDetalhes);
        } catch (error) {
          console.error("Erro ao carregar jogadores da partida:", error);
          alert("Erro ao carregar jogadores para o sorteio.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setJogadoresDaPartida([]);
      }
    }

    carregarJogadores();
  }, [partida]);

  const sortearTimes = () => {
    const jogadoresEmbaralhados = [...jogadoresDaPartida].sort(() => Math.random() - 0.5);

    const novoTimeA = [];
    const novoTimeB = [];

    jogadoresEmbaralhados.forEach((jogador, index) => {
      if (index % 2 === 0) {
        novoTimeA.push(jogador);
      } else {
        novoTimeB.push(jogador);
      }
    });

    setTimeA(novoTimeA);
    setTimeB(novoTimeB);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando jogadores...</Text>
      </View>
    );
  }

  if (!partida || !partida.id) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Erro!</Text>
        <Text style={styles.text}>Nenhuma partida selecionada para o sorteio.</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Voltar
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Sorteio de Times</Text>
      <Text variant="titleMedium" style={styles.subtitle}>Partida: {partida.nome} em {partida.data}</Text>

      {jogadoresDaPartida.length === 0 ? (
        <Text style={styles.noPlayersText}>Nenhum jogador associado a esta partida para sortear.</Text>
      ) : (
        <>
          <Text style={styles.playersCount}>Jogadores Disponíveis: {jogadoresDaPartida.length}</Text>
          <View style={styles.playersListContainer}>
            {jogadoresDaPartida.map(jogador => (
              <Chip key={jogador.id} style={styles.playerChip} icon="account">
                {jogador.apelido || jogador.nome}
              </Chip>
            ))}
          </View>

          <Button
            mode="contained"
            icon="shuffle"
            onPress={sortearTimes}
            style={styles.sortButton}
            disabled={jogadoresDaPartida.length < 2}
          >
            Sortear Times
          </Button>

          {timeA.length > 0 && timeB.length > 0 && (
            <View style={styles.teamsContainer}>
              <Card style={styles.teamCard}>
                <Card.Title title="Time A" titleStyle={styles.teamTitle} />
                <Card.Content>
                  <FlatList
                    data={timeA}
                    keyExtractor={(item) => item.id.toString() + 'A'}
                    renderItem={({ item }) => (
                      <List.Item
                        title={item.apelido || item.nome}
                        left={() => <List.Icon icon="account" />}
                        description={`Posição: ${item.posicao || 'N/A'}`}
                      />
                    )}
                    scrollEnabled={false}
                  />
                  <Text style={styles.teamCount}>Total: {timeA.length} jogadores</Text>
                </Card.Content>
              </Card>

              <Card style={styles.teamCard}>
                <Card.Title title="Time B" titleStyle={styles.teamTitle} />
                <Card.Content>
                  <FlatList
                    data={timeB}
                    keyExtractor={(item) => item.id.toString() + 'B'}
                    renderItem={({ item }) => (
                      <List.Item
                        title={item.apelido || item.nome}
                        left={() => <List.Icon icon="account" />}
                        description={`Posição: ${item.posicao || 'N/A'}`}
                      />
                    )}
                    scrollEnabled={false}
                  />
                  <Text style={styles.teamCount}>Total: {timeB.length} jogadores</Text>
                </Card.Content>
              </Card>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  playersCount: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  playersListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  playerChip: {
    margin: 4,
  },
  noPlayersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  sortButton: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '80%',
  },
  teamsContainer: {
    marginTop: 20,
  },
  teamCard: {
    marginVertical: 10,
    elevation: 3,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#4285F4',
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  teamCount: {
    textAlign: 'right',
    marginTop: 10,
    fontStyle: 'italic',
    color: '#666',
  },
});