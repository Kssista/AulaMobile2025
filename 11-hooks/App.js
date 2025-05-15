import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Nome from './src/components/Nome';
import { useState } from 'react';

export default function App() {

  const [nome, setNome] = useState('?????')

  function esconder() {
    setNome('?????')
  }

  function revelar() {
    setNome('Flu')
  }


  return (
    <View>

      <Card>
        <Card.Content>
          <Card.Title title="Componente Nome" />
          <Text>Nome: {nome}</Text>
          <Card.Actions>
            <Button onPress={esconder}>Esconder</Button>

            <Button onPress={revelar}>Revelar</Button>

          </Card.Actions>
        </Card.Content>
      </Card>

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
