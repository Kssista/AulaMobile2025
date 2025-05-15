import React from 'react'

import {  Ionicons  } from '@expo/vector-icons'

import ConfigScreen from '../screens/ConfigScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import UserScreen from '../screens/UserScreen'

import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator>

            <Drawer.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                    title: "início",
                    drawerIcon: ({color, size}) => <Ionicons name='home' color={color} size={size} />
                }} 
        />

            <Drawer.Screen name='ConfigScreen' component={ConfigScreen} />

            <Drawer.Screen name='UserScreen' component={UserScreen} />

            <Drawer.Screen name='ProfileScreen' component={ProfileScreen} />

        </Drawer.Navigator>
    )
}
