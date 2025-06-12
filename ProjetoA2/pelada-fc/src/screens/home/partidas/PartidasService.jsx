import AsyncStorage from '@react-native-async-storage/async-storage';

async function listar() {
  const jsonValue = await AsyncStorage.getItem('@partidas');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(partida) {
  partida.id = new Date().getTime();
  // Adiciona campos para os nomes dos times no objeto partida, se não existirem
  // Isso é importante para que o placar e resultados possam usar esses nomes
  if (!partida.nomeTimeCasa) {
    partida.nomeTimeCasa = 'Time A'; // Valor padrão
  }
  if (!partida.nomeTimeFora) {
    partida.nomeTimeFora = 'Time B'; // Valor padrão
  }
  
  const partidas = await listar();
  partidas.push(partida);
  await AsyncStorage.setItem('@partidas', JSON.stringify(partidas));
}

async function buscar(id) {
  const partidas = await listar();
  return partidas.find(partida => partida.id === id);
}

async function remover(id) {
  const partidas = await listar();
  const novaLista = partidas.filter(partida => partida.id !== id);
  await AsyncStorage.setItem('@partidas', JSON.stringify(novaLista));
}

async function atualizar(novopartida) {
  const partidas = await listar();
  const novaLista = partidas.map(partida => partida.id === novopartida.id ? novopartida : partida);
  await AsyncStorage.setItem('@partidas', JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover
}