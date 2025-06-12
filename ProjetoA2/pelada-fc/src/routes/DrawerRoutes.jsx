import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import { Ionicons } from '@expo/vector-icons';
import SorteioScreen from '../screens/home/sorteio/SorteioScreen';
import PartidasStack from '../screens/home/partidas/PartidasStack';
import JogadoresStack from '../screens/home/jogadores/JogadoresStack'; 


const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="HomeScreen"
                component={TabRoutes}
                options={{
                    title: 'Pelada FC',
                    drawerIcon: ({ color, size }) => <Ionicons name="football-outline" size={size} color={color} />
                }}
            />
            <Drawer.Screen
                name="PartidasScreen" 
                component={PartidasStack}
                options={{
                    title: 'Partidas',
                    drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />
                }}
            />
            <Drawer.Screen
                name="JogadoresScreen" 
                component={JogadoresStack} 
                options={{
                    title: 'Jogadores',
                    drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />
                }}
            />
            <Drawer.Screen
                name="SorteioScreen"
                component={SorteioScreen}
                options={{
                    title: 'Sorteio',
                    drawerIcon: ({ color, size }) => <Ionicons name="dice-outline" size={size} color={color} />
                }}
            />
        </Drawer.Navigator>
    );
}