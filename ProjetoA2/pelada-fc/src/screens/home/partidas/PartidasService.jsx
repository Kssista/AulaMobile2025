import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@partidas'; 

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(partida) {
  partida.id = new Date().getTime();
  const partidas = await listar();
  partidas.push(partida);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(partidas));
}

async function buscar(id) {
  const partidas = await listar();
  return partidas.find(partida => partida.id === id);
}

async function remover(id) {
  const partidas = await listar();
  const novaLista = partidas.filter(partida => partida.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function atualizar(novaPartida) { 
  const partidas = await listar();
  const novaLista = partidas.map(partida => partida.id === novaPartida.id ? novaPartida : partida);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover
};