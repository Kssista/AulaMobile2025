import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JogadoresLista from './JogadoresLista';
import JogadoresForm from './JogadoresForm';

const Stack = createNativeStackNavigator();

export default function JogadoresStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name='JogadoresLista'
        component={JogadoresLista}
        options={{
          title: 'Lista de Jogadores',
        }}
      />
      <Stack.Screen
        name='JogadoresForm'
        component={JogadoresForm}
        options={{
          title: 'Cadastro de Jogador',
        }}
      />
    </Stack.Navigator>
  );
}