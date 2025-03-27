import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Perfil(props) {
    console.log("propriedades -->", props)


  return (
    <View style={styles.container}>

      <Text>Perfil</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "yellow",
        borderWidth: 5,
        padding: 10,
    },
    texto: {
        fontSize: 15,
        fontWeight: 600
    }
})