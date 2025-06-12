import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import SorteioScreen from '../screens/home/sorteio/SorteioScreen';
import PartidasStack from '../screens/home/partidas/PartidasStack';
import JogadoresStack from '../screens/home/jogadores/JogadoresStack'; 

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="PartidasStack"
                component={PartidasStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Ionicons name='calendar-outline' color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="JogadoresStack" 
                component={JogadoresStack} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Ionicons name='people-outline' color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Sorteios"
                component={SorteioScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Ionicons name='dice-outline' color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
}