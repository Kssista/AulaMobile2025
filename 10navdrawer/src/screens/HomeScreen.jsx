import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function HomeScreen(navigation, route) {
  return (
    <View>
      <Text>Drawer</Text>

      <Button
        mode='contained'
        onPress={() => navigation.openDrawer()}
      >
        Abrir Drawer
      </Button>

      <Button
        mode='contained'
        onPress={() => {
          navigation.openDrawer()
          setTimeout(() => {
            navigation.closeDrawer()
          }, 3000)
        }}
      >
        Fechar Drawer
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({})