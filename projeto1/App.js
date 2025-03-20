// imports
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

//componente principal
//ele deve retornar o que será renderizado na tela (Template feito com jsx)
export default function App() {
  //lógica do meu componente

  const nome = "Estevão Lindo"

  function alerta(){ 
    "Belo clique!"}


  //retorno com jsx
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* comentárioooo */}
      {/* código JS */}
      <Text>{2 + 2}</Text>
      <Text>{nome}</Text>
      <Text>Faz um piquis!</Text>

      <Button title="alerta" onPress={alerta}> </Button>

      <Image
        source={ {uri:"https://media.tenor.com/aQQT2lV_XcsAAAAe/mario.pnghttps://media.tenor.com/aQQT2lV_XcsAAAAe/mario.png"}}
        style={{
          height: 300,
          width: 300
        }}
      />

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
