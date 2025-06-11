import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// Componentes do react-native-paper para UI bonita e consistente
import { Card, Text } from 'react-native-paper';
import PartidasScreen from './PartidasScreen';

export default function HomeScreen() {
    return (
        // ScrollView permite a rolagem da tela se o conteúdo for maior que o espaço
        <ScrollView>
            <View style={styles.container}>

                {/* Título da página */}
                <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>Bem-vindo ao Pelada FC!</Text>

                {/* Card 1 com título e parágrafo */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant='titleLarge'>Últimas Notícias</Text>
                        <Text>Acompanhe as últimas novidades da sua pelada favorita.</Text>
                    </Card.Content>
                    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
           */}
                </Card>

                {/* Card 2 */}
                <Card onClick={PartidasScreen} style={styles.card} >
                    <Card.Content>
                        <Text variant='titleLarge'>Partidas da Semana</Text>
                        <Text>Confira os horários e locais dos próximos jogos.</Text>
                    </Card.Content>
                    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                </Card>

                {/* Card 3 */}
                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant='titleLarge'>Dicas para Jogadores</Text>
                        <Text>Melhore seu desempenho com dicas práticas e exercícios.</Text>
                    </Card.Content>
                    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                </Card>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10,
    },
    card: {
        margin: 10,
        width: '90%',
    },
});
