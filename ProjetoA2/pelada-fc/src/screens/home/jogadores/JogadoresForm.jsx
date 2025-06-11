import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import JogadoresService from './JogadoresService';

export default function JogadoresForm({ navigation, route }) {
  const jogadorAntigo = route.params || {};

  const [nome, setNome] = useState(jogadorAntigo.nome || '');
  const [posicao, setPosicao] = useState(jogadorAntigo.posicao || ''); 
  const [contato, setContato] = useState(jogadorAntigo.contato || ''); 
  const [nivel, setNivel] = useState(jogadorAntigo.nivel || '');     
  const [apelido, setApelido] = useState(jogadorAntigo.apelido || ''); 

  async function salvar() {
    const jogador = {
      nome,
      posicao,
      contato,
      nivel,
      apelido,
    };

    if (!jogador.nome || !jogador.posicao || !jogador.contato || !jogador.nivel || !jogador.apelido) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (jogadorAntigo.id) {
      jogador.id = jogadorAntigo.id;
      await JogadoresService.atualizar(jogador);
      alert('Jogador atualizado com sucesso!');
    } else {
      await JogadoresService.salvar(jogador);
      alert('Jogador cadastrado com sucesso!');
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'JogadoresLista' }],
    });
  }

  return (
    <View style={styles.container}>
      <Text variant='headlineLarge'>Cadastro de Jogador</Text>

      <TextInput
        label='Nome Completo'
        style={styles.input}
        mode='outlined'
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        label='Posição Principal'
        style={styles.input}
        mode='outlined'
        value={posicao}
        onChangeText={setPosicao}
      />
      <TextInput
        label='Contato (WhatsApp)'
        style={styles.input}
        mode='outlined'
        value={contato}
        onChangeText={setContato}
        keyboardType='numeric'
        placeholder='(99) 99999-9999'
        render={(props) => (
          <TextInputMask
            {...props}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
          />
        )}
      />
      <TextInput
        label='Nível (Ex: Iniciante, Médio, Avançado)'
        style={styles.input}
        mode='outlined'
        value={nivel}
        onChangeText={setNivel}
      />
      <TextInput
        label='Apelido'
        style={styles.input}
        mode='outlined'
        value={apelido}
        onChangeText={setApelido}
      />

      <Button
        style={styles.button}
        mode='contained'
        onPress={salvar}
      >
        Salvar
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});