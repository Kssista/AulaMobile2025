import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Card } from 'react-native-paper'

export default function NumeroAleatorio() {

    const [numeroAleatorio, setNumeroAleatorio] = useState(0)
    const [listaNumeros, setListaNumeros] = [[]]

    function gerar() {
        const numeroGerado = Math.round(Math.random() * 101)
        setNumeroAleatorio(numeroGerado)
        setListaNumeros([...listaNumeros, numeroGerado])
    }

    return (
        <View>
            <Card style={{ margin: 5 }}>
                <Card.Content>
                    <Text>Gerador de Número Açeatório</Text>
                    <Text variant='displayMedium'>Número: {numeroAleatorio}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button>Gerar</Button>
                </Card.Actions>
            </Card>
            <Card>
                <Card.Content>
                    {listaNumeros.map(numero => <Text>{numero}</Text>)}
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({})