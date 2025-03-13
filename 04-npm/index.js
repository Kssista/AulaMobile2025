 // código para executar meu projeto
 //importar um módulo

import { calcularIMC, tabelaIMC } from "./calculadoraIMC"

console.log("Calculadora IMC")
console.table(tabelaIMC)


 const peso = 80
 const altura = 1.70
 
 const resultado = calcularIMC(peso, altura)

 console.log("Resultado do IMC: ")
 console.log(resultado.toFixed(2))

 //importar um módulo externo, importar uma biblioteca

 import moment from "moment"
 
 const hoje = moment().locale('pt-br')

 console.log("Data: ")
 console.log(hoje.format("DD/MM/YYYY"))