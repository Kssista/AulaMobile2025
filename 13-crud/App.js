import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import AlunoStack from './src/alunos/AlunoStack';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AlunoStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

