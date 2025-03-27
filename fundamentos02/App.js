import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimeiroComponente from './components/PrimeiroComponente';
import JavascriptComponente from './components/JavascriptComponente';
import Perfil from './components/Perfil';
import ListaComponente from './components/ListaComponente';
import Atleta from './components/Atleta';

export default function App() {

const listaAtletas = [
          {nome:"Germán Cano",
          idade:36,
          numero:14,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlrvvE1oAjqoxjXHOkhw8vuDUEjDyQ1DtmDw&s"
        },
          {nome:"Jhon Árias",
          idade:26,
          numero:21,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4k8uaxU3E_ZaeQcyE4Ar0sAKShJO0g9I9TQ&s"
        },
]

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {
          listaAtletas.map(
            atleta => {
              <Atleta
                nome={atleta.nome}
                idade={atleta.idade}
                numero={atleta.numero}
                image={atleta.imagem}
                />
            }
          )
        }









      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
