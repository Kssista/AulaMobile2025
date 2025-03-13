console.log("tá rodando o código da Anninha");

import { soma, divisao, multiplicacao, subtracao } from "./calculadora.js"
import moment from "moment"

console.log("Soma: ", soma(10, 5))
console.log("Subtração: ", subtracao(10, 5))
console.log("Mutiplicação: ", multiplicacao(10, 5))
console.log("Divisão: ", divisao(10, 5))

const anoAtual = moment().year()

function calcularIdade(anoNascimento) {
  let idade = anoAtual - anoNascimento
  return idade
}

const anoNascimento = 1990;
const idade = calcularIdade(anoNascimento);
console.log(`Idade: ${idade} anos`);