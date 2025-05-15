import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function Feed() {
  return (
    <View>
      <Text>Feed</Text>
      <Text>Feed</Text>
      <Text>Feed</Text>
      <Text>Feed</Text>
      <Text>Feed</Text>
      <Text>Feed</Text>

      <Button
        modo='contained'
        onPress={() => navigation.navigate('Post')}
      >
        Ir para Posts
      </Button>

      <Button
        modo='contained'
        onPress={() => navigation.goBack('')}
      >
        Voltar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})