import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import PartidasScreen from '../screens/PartidasScreen'
import SorteioScreen from '../screens/SorteioScreen'
import TabRoutes from './TabRoutes'
import PartidasLista from '../screens/home/partidas/PartidasLista'
import PartidasStack from '../screens/home/partidas/PartidasStack'


const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Inicio' component={TabRoutes} />
      <Stack.Screen name='Partidas' component={PartidasStack} />
      <Stack.Screen name='Sorteio' component={SorteioScreen} />
    </Stack.Navigator>
  )
}