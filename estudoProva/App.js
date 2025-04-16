import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import JogadorScreen from './screens/JogadorScreen';
import TitulosScreen from './screens/TitulosScreen';
import EscudoScreen from './screens/EscudoScreen';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen
            name='EscudoScreen'
            component={EscudoScreen}
            options={{
              title: 'Tela Principal',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#990000'
              },
              tabBarIcon: ({ color, size }) => <Ionicons name='shield' color={color} size={size} />
            }}
          />

          <Tab.Screen
            name='JogadorScreen'
            component={JogadorScreen}
            options={{
              title: 'Jogadores',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#990000',
              },
              tabBarIcon: ({ color, size }) => <Ionicons name='person' color={color} size={size} />
            }}
          />

          <Tab.Screen
            name='TitulosScreen'
            component={TitulosScreen}
            options={{
              title: 'Tela de Início',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#990000'
              },
              tabBarIcon: ({ color, size }) => <Ionicons name='star' color={color} size={size} />
            }}
          />

        </Tab.Navigator >
      </NavigationContainer>
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
