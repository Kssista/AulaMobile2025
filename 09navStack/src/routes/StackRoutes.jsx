import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Feed from '../screens/Feed'
import Home from '../screens/Home'
import Post from '../screens/Post'

export default function StackRoutes() {

    const Stack = createStackNavigator()

  return (
    <Stack.Navigator>

        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Feed' component={Feed} />
        <Stack.Screen name='Post' component={Post} />

    </Stack.Navigator>
  )
}
