import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const titulos = [
  {
    nome: "Campeonato Brasileiro",
    anos: [1970, 1984, 2010, 2012]
  },
  {
    nome: "Copa do Brasil",
    anos: [2007]
  },
  {
    nome: "Copa Libertadores da América",
    anos: [2023]
  },
  {
    nome: "Recopa",
    anos: [2024]
  }
];

export default function TitulosScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.anos}>
        {item.anos.join(', ')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={titulos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: '#f3e5f5',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 5,
  },
  anos: {
    fontSize: 16,
    color: '#8e24aa',
  },
});
