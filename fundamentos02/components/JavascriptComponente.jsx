import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function JavascriptComponente() {
    //Lógica do Componente

    const nome ="Estevão Lindo"
    const idade = 22

    
    function checarMaiorIdade() {
        console.log("chamou a função")
        if (idade >= 18) {
            return "Sim"
        } else {
            "Não"
        }

    }

    function alerta(){
        console.log("Apertou o botããããão!!!!")
        alert("Apertou o botããããão!!!!")
    }

    //retorno jsx
  return (
    <View style={styles.container}>

      <Text style={styles.texto}>JavascriptComponente</Text>
      <Text style={styles.texto}>{nome}</Text>
      <Text style={styles.texto}>IDADE: {idade}</Text>
      <Text style={styles.texto}>IDADE + 40: {idade + 40}</Text>
      <Text style={styles.texto}>É maior de idade? {checarMaiorIdade()}</Text>


      <Button title='Enviar' onPress={alerta} style={backgroundColor="black" } />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"yellow",
        borderWidth: 5,
        padding: 10
    },
    texto:{
        fontSize: 20,
        fontWeight: 600
    }
})