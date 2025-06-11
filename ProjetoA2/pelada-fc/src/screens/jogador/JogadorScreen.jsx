import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Jogador({ navigation, route }) {
  // Exemplo de como receber parâmetros da navegação
  console.log("Parametros recebidos: ", route.params);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Jogadores</Text>

      {/* Vários textos apenas para encher a tela */}
      <Text>Jogador 1</Text>
      <Text>Jogador 2</Text>
      <Text>Jogador 3</Text>

      {/* Mostra um parâmetro que pode ter sido passado na navegação */}
      <Text>Parametro Recebido: {route.params ? route.params.nome : 'Nenhum'}</Text>

      {/* Botão para navegar para uma próxima tela (que você pode criar depois) */}
      <Button
        mode='contained'
        onPress={() => navigation.navigate('Home')} // Exemplo simples de voltar para Home
        style={styles.button}
      >
        Voltar para Início
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  button: { marginTop: 20 }
});
