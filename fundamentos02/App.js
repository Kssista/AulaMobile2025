import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PrimeiroComponente from './components/PrimeiroComponente';
import JavascriptComponente from './components/JavascriptComponente';
import Perfil from './components/Perfil';
import ListaComponente from './components/ListaComponente';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* <PrimeiroComponente />
      <JavascriptComponente /> */}

      <Text style={styles.texto}></Text>
      <ListaComponente />
      
      {/* <Perfil 
        nome="ESTEVÃO"
        idade="22"
        email="abcd@mail.com"
        telefone='(11)4002-8922'
      />
      <Perfil 
        nome="ESTEVÃO"
        idade="22"
        email="abcd@mail.com"
        telefone='(11)4002-8922'
      />
      <Perfil 
        nome="ESTEVÃO"
        idade="22"
        email="abcd@mail.com"
        telefone='(11)4002-8922'
      /> */}

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
