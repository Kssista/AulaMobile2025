import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import Feed from './Feed'

export default function Home({ navigation, route }) {
  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>

      <Button 
      modo= 'contained'
      onPress={()=> navigation.navigate('Feed')}
      >
        Ir para Feed
      </Button>
      
      <Button 
      modo= 'contained'
      onPress={()=> navigation.navigate('Feed')}
      >
        Ir para Feed
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})