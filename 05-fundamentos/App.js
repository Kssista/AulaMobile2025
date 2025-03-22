import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SegundoComponente from './components/SegundoComponente';
import JavascriptComponente from './components/JavascriptComponente';
import Perfil from './components/Perfil';

export default function App() {
  return (
    <View style={styles.container}>

      <SegundoComponente />
      <JavascriptComponente />
      <Perfil 
        nome="Estevão"
        sobrenome="Costa"
        idade={22}
      />
      <Perfil 
        nome="Clebin"
        sobrenome="Bala Boa"
        idade={12}
      />
      <Perfil 
        nome="Germán"
        sobrenome="Cano"
        idade={360}
      />

      <StatusBar style="auto" />
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
