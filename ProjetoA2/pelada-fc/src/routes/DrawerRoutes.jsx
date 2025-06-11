import React from 'react';
// Importa o drawer navigator para menu lateral
import { createDrawerNavigator } from '@react-navigation/drawer';
// Importa as abas que ficarão na parte inferior da tela
import TabRoutes from './TabRoutes';
// Tela simples de configurações
// Ícones para o menu
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SorteioScreen from '../screens/SorteioScreen';

const Drawer = createDrawerNavigator();

// Componente das rotas do Drawer
export default function DrawerRoutes() {
    return (
        <Drawer.Navigator>
            {/* Tela principal que abre as abas inferiores */}
            <Drawer.Screen
                name="HomeScreen"
                component={TabRoutes}
                options={{
                    title: 'Pelada FC',
                    drawerIcon: ({ color, size }) => <Ionicons name="football-outline" size={size} color={color} />
                }}
            />

            {/* <Drawer.Screen
                name='SorteioScreen'
                component={SorteioScreen}
                options={{
                    title: "Sorteios",
                    drawerIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
                }}
            /> */}

            {/* Tela de configurações */}
            {/* <Drawer.Screen 
        name="Configuracoes" 
        component={Configuracoes} 
        options={{
          title: 'Configurações',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />
        }}
      /> */}
        </Drawer.Navigator>
    );
}
