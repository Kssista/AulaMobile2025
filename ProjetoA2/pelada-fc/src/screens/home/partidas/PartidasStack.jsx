// src/screens/home/partidas/PartidasStack.jsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PartidasForm from './PartidasForm'
import PlacarScreen from './PlacarScreen' // Importe a nova tela de Placar
import ResultadosScreen from './ResultadosScreen' // Importe a nova tela de Resultados
import PartidasLista from './PartidasLista'

const Stack = createNativeStackNavigator()

export default function PartidasStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name='PartidasLista'
        component={PartidasLista}
        options={{
          title: 'Lista de Partidas',
          headerTitleAlign: 'center'
        }}
      />

      <Stack.Screen
        name='PartidasForm'
        component={PartidasForm}
        options={{
          title: 'Cadastro de Partidas',
          headerTitleAlign: 'center'
        }}
      />

      <Stack.Screen
        name='PlacarScreen' // Nova rota para a tela de placar
        component={PlacarScreen}
        options={{
          title: 'Controle de Placar',
          headerTitleAlign: 'center'
        }}
      />

      <Stack.Screen
        name='ResultadosScreen' // Nova rota para a tela de resultados
        component={ResultadosScreen}
        options={{
          title: 'Resultados das Partidas',
          headerTitleAlign: 'center'
        }}
      />

    </Stack.Navigator>
  )
}