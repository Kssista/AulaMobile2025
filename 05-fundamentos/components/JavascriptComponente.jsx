import { View, Text } from 'react-native'
import React from 'react'

export default function JavascriptComponente() {
  const nome = "Estevão"
  const idade = 21

  function exibirNome(){
    return nome
  }

  function testarIdade(){
    if(idade >= 18){
      return "Maior de idade"
  }
  else{"Menor de Idade"
  }
}

  return (
    <View>
      
      <Text>JavascriptComponente</Text>
      <Text>{nome}</Text>
      <Text>{idade}</Text>
      <Text>Resultado: {22 + 3} </Text>
      <Text>Idade: {idade - 4} </Text>
      <Text> Check 18+: {testarIdade()}</Text>
      <Text>Check 18+: {idade >= 18 ? "Maior de idade" : "Menor de idade"} </Text>

    </View>
  )
}