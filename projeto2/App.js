import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const nome = "Germán Cano"

  function alerta() {
    alert("Gol de Germán Cano!!!")
  }

  //retorno é um código jsx (Template) do que vai ser renderizado na tela
  return (
    <ScrollView>

      <View style={styles.container}>
        <StatusBar style="auto" />


        <Text style={{ fontSize: 40 }}>Rei da América</Text>
        <Text style={{ fontSize: 20 }}>{nome}</Text>
        <Text style={{ }}>
          German cano foi artilheiro do Brasil em 2022 e 2023
        </Text>
        
        <Text>Em 2022: marcou impressionantes 43 gols</Text>
        <Text>Em 2023: marcou 40 gols, e foi artilheiro da libertadores</Text>

        <Button title='GOL!!!' onPress={alerta}> </Button>

        <Text></Text>

        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png'
          }}
          style={{
            height: 100,
            width: 100,
          }}

        />

        <Text></Text>

        <Image
          source={require('./images/image.png')

          }
          style={{
            height: 150,
            width: 250,
          }}

        />
        <Text></Text>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png'
          }}
          style={{
            height: 100,
            width: 100,
          }}

        />

        <Text></Text>

        <Image
          source={require('./images/image.png')

          }
          style={{
            height: 150,
            width: 250,
          }}

        />
        <Text></Text>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png'
          }}
          style={{
            height: 100,
            width: 100,
          }}

        />

        <Text></Text>

        <Image
          source={require('./images/image.png')

          }
          style={{
            height: 150,
            width: 250,
          }}

        />
        <Text></Text>



      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
});
