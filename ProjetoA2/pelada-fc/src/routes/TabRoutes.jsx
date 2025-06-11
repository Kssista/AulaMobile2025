import React from 'react';
// Importa o Bottom Tabs para navegação na parte inferior
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importa as telas que ficarão nas abas
import PartidasScreen from '../screens/PartidasScreen';
import HomeScreen from '../screens/HomeScreen';

// Ícones para as abas
import { Ionicons } from '@expo/vector-icons';
import SorteioScreen from '../screens/SorteioScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                    title: 'Tela de Início',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'tomato'
                    },
                    tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Partidas"
                component={PartidasScreen}
                options={{
                    title: 'Partidas',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'tomato'
                    },
                    tabBarIcon: ({ color, size }) => <Ionicons name='calendar-outline' color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Sorteios"
                component={SorteioScreen}
                options={{
                    title: 'Sorteios',
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'tomato'
                    },
                    tabBarIcon: ({ color, size }) => <Ionicons name='dice-outline' color={color} size={size} />
                }}
            />

        </Tab.Navigator>
    );
}
