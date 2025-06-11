
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PartidasForm from './PartidasForm'
import PartidasLista from './PartidasLista'

const Stack = createNativeStackNavigator()

export default function PartidasStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name='PartidasLista'
        component={PartidasLista}
        options={{
          title: 'Lista de Partidass',
          headerTitleAlign: 'center'
        }}
      />

      <Stack.Screen
        name='PartidasForm'
        component={PartidasForm}
        options={{
          title: 'Cadastro de Partidass',
          headerTitleAlign: 'center'
        }}
      />



    </Stack.Navigator>
  )
}
