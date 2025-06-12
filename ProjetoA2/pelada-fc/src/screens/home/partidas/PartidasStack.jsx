import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PartidasForm from './PartidasForm'
import PlacarScreen from './PlacarScreen'
import ResultadosScreen from './ResultadosScreen'
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
        name='PlacarScreen'
        component={PlacarScreen}
        options={{
          title: 'Controle de Placar',
          headerTitleAlign: 'center'
        }}
      />

      <Stack.Screen
        name='ResultadosScreen'
        component={ResultadosScreen}
        options={{
          title: 'Resultados das Partidas',
          headerTitleAlign: 'center'
        }}
      />

    </Stack.Navigator>
  )
}