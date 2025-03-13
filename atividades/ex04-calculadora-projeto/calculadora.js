console.log("deu bomm")

function soma(num1, num2) {
    let resultado = num1 + num2;
    return resultado;
  }
  
  function subtracao(a, b) {
    let resultado = a - b;
    return resultado;
  }
  
  function multiplicacao(x, y) {
    let resultado = x * y;
    return resultado;
  }
  
  function divisao(dividendo, divisor) {
    let resto = dividendo / divisor;
    return resto;
  }
  
  export { soma, subtracao, multiplicacao, divisao };