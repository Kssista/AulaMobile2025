import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

const jogador = [
    {
        nome: "Jhon Arias",
        numero: 21,
        imagem: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/jhon-arias-fluminense-ldu-recopa-e1721395150887.jpg?w=1200&h=1200&crop=1",
    },
    {
        nome: "Germán Cano",
        numero: 14,
        imagem: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/08/GettyImages-1651823712-e1693535095123.jpg?w=420&h=240&crop=1&quality=85",
    },
    {
        nome: "Ganso",
        numero: 10,
        imagem: "https://s3.amazonaws.com/assets-fluminense/uploads%2F1740675622679-54336164637_96dbeaa5cb_k.jpg",
    },
    {
        nome: "Thiago Silva",
        numero: 3,
        imagem: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/05/thiago-silva-e1715092038211.jpeg?w=1200&h=900&crop=1", // Foto com uniforme atual
    },
    {
        nome: "Fábio",
        numero: 1,
        imagem: "https://nossoflu.com.br/wp-content/uploads/2024/02/FABIO_FLU_3.jpg",
    },
];

export default function JogadorScreen() {
    const renderItem = ({ item }) => (
        <ScrollView>
            <View style={styles.item}>
                <Image source={{ uri: item.imagem }} style={styles.imagem} />
                <View>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.numero}>Camisa {item.numero}</Text>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={jogador}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0f7fa',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2,
    },
    imagem: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    numero: {
        fontSize: 16,
        color: '#555',
    },
});