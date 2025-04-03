import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, PaperProvider, Paragraph, Text, Title } from 'react-native-paper';

export default function App() {

  return (
    <PaperProvider>

      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="auto" />

          <Button mode='contained' onPress={() => alert('Clicou')} >Clicar AQUI!</Button>
          <Button mode='contained-tonal' >Clicar</Button>
          <Button mode='elevated' >Clicar</Button>
          <Button mode='outlined' >Clicar</Button>
          <Button mode='text' >Clicar</Button>

          <Text variant='bodyLarge'>Um texto qualquer</Text>
          <Divider style={{ width: '90%' }} />
          <Text variant='displayLarge'>Um texto qualquer</Text>
          <Divider style={{ width: '90%' }} />
          <Text variant='headlineLarge'>Um texto qualquer</Text>
          <Divider style={{ width: '90%' }} />
          <Text variant='labelLarge'>Um texto qualquer</Text>
          <Divider style={{ width: '90%' }} />
          <Text variant='titleLarge'>Um texto qualquer</Text>
          <Divider style={{ width: '90%' }} />
          <Text>Um texto qualquer</Text>
          <Divider style={{ width: '90%' }} />


          <Card style={{ margin: 10 }}>
            <Card.Title title="teste">
              <Text>Teste</Text>
            </Card.Title>
            <Card.Content>
              <Title>Um titulo qualquer</Title>
              <Paragraph>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Text>teste</Text>
            </Card.Actions>
          </Card>


          <Card style={{ margin: 10 }}>
            <Card.Title title="teste">
              <Text>Teste</Text>
            </Card.Title>
            <Card.Content>
              <Title>Um titulo qualquer</Title>
              <Paragraph>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Text>teste</Text>
            </Card.Actions>
          </Card>

        </View>
      </ScrollView>
    </PaperProvider>
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