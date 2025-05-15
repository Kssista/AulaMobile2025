import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Post() {
  return (
    <View>
      <Text>Post</Text>
      <Text>Post</Text>
      <Text>Post</Text>
      <Text>Post</Text>
      <Text>Post</Text>
      <Text>Post</Text>

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