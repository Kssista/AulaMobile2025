import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ListaComponente() {
    const listaCarros = ["Gol", "Palio", "Celta", "Uno", "BYD", "Honda Civic"]



    return (
        <View style={styles.container}>
            {listaCarros.map(
                carro => <Text>{carro}</Text>
            )}

            {
                listaCarros.map(
                    (carro) => {
                        return (
                            <View style={styles.containerAmarelo}>
                                <Text>{carro}</Text>
                            </View >
                        )
                    }

                )
            }


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        borderWidth: 5,
        padding: 10,
        borderColor: "yellow"
    },
    containerAmarelo: {
        backgroundColor: "yellow",
        borderWidth: 5,
        padding: 10
    }
})