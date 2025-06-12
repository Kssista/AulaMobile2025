// src/screens/home/partidas/ResultadosScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import PartidasService from './PartidasService';

export default function ResultadosScreen({ navigation }) {
  const [partidasFinalizadas, setPartidasFinalizadas] = useState([]);
  const isFocused = useIsFocused(); // Hook para saber se a tela está focada

  useEffect(() => {
    if (isFocused) {
      carregarResultados();
    }
  }, [isFocused]);

  async function carregarResultados() {
    const todasPartidas = await PartidasService.listar();
    const resultados = todasPartidas.filter(p => p.placar && p.placar.partidaFinalizada);
    setPartidasFinalizadas(resultados);
  }

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.nome}</Title>
        {item.placar ? (
          <View>
            <Paragraph style={styles.placarText}>
              {item.nomeTimeCasa || 'Time da Casa'}: <Text style={styles.golsText}>{item.placar.timeCasaGols}</Text>
            </Paragraph>
            <Paragraph style={styles.placarText}>
              {item.nomeTimeFora || 'Time de Fora'}: <Text style={styles.golsText}>{item.placar.timeForaGols}</Text>
            </Paragraph>
            <Paragraph style={styles.dataSalvamento}>
              Salvo em: {new Date(item.placar.dataSalvamento).toLocaleString()}
            </Paragraph>

            <Text style={styles.sectionTitle}>Histórico de Gols:</Text>
            {item.placar.golsRegistrados && item.placar.golsRegistrados.length > 0 ? (
              <FlatList
                data={item.placar.golsRegistrados}
                keyExtractor={(gol) => gol.id.toString()}
                renderItem={({ golItem }) => (
                  <Text style={styles.golItem}>
                    • {golItem.autor} ({golItem.time === 'casa' ? (item.nomeTimeCasa || 'Casa') : (item.nomeTimeFora || 'Fora')}) às {new Date(golItem.timestamp).toLocaleTimeString()}
                  </Text>
                )}
              />
            ) : (
              <Text style={styles.noGoals}>Nenhum gol registrado.</Text>
            )}

          </View>
        ) : (
          <Paragraph style={styles.noResultText}>Resultado ainda não disponível.</Paragraph>
        )}
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('PlacarScreen', { partidaId: item.id })}>
          Ver/Editar Placar
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultados das Partidas</Text>
      {partidasFinalizadas.length > 0 ? (
        <FlatList
          data={partidasFinalizadas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyList}>Nenhum resultado de partida finalizada encontrado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#424242',
  },
  placarText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  golsText: {
    fontWeight: 'bold',
    color: '#4CAF50',
    fontSize: 20,
  },
  dataSalvamento: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    fontStyle: 'italic',
  },
  noResultText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#666',
  },
  golItem: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 3,
    color: '#777',
  },
  noGoals: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
    marginLeft: 10,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#777',
  },
});