import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';


export default function App() {
  return (

    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Text variant='displaySmall'>Lista de Estados</Text>  


      </View>
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
