import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@jogadores_data';

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(jogador) {
  jogador.id = new Date().getTime();
  const jogadores = await listar();
  jogadores.push(jogador);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jogadores));
}

async function buscar(id) {
  const jogadores = await listar();
  return jogadores.find(jogador => jogador.id === id);
}

async function remover(id) {
  const jogadores = await listar();
  const novaLista = jogadores.filter(jogador => jogador.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function atualizar(novoJogador) {
  const jogadores = await listar();
  const novaLista = jogadores.map(jogador => jogador.id === novoJogador.id ? novoJogador : jogador);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover
};