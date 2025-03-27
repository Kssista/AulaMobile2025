import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Atleta(props) {

    const {nome, idade, numero, imagem} = props


  return (
    <View style={styles.container}>

      <Text style={styles.texto}>Atleta</Text>

      <Text style={styles.texto}>NOME: </Text>
      <Text style={styles.texto}>IDADE: </Text>
      <Text style={styles.texto}>NÚMERO: </Text>
      <Text style={styles.texto}>IMAGEM: </Text>


        <Image
            source={{
                uri: imagem
                
            }}
            style={{
                height: 200,
                width: 200,
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "yellow",
        borderWidth: 10,
        padding: 5,
        alignItems: "center"
    },
    texto:{
        fontSize: 20,
        fontWeight: 600
    }
})