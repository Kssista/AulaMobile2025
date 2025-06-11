import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { Button, Card, Text, List, ActivityIndicator, Colors } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import PartidasService from './home/partidas/PartidasService';
import JogadoresService from './home/jogadores/JogadoresService'; 
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [partidas, setPartidas] = useState([]);
    const [loading, setLoading] = useState(true);

    async function carregarPartidas() {
        setLoading(true);
        try {
            const listaPartidas = await PartidasService.listar();
            
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0); 

            const proximasPartidas = listaPartidas.filter(p => {
                const [dia, mes, ano] = p.data.split('/');
                const dataPartida = new Date(ano, mes - 1, dia); 
                return dataPartida >= hoje;
            }).sort((a, b) => { 
                const [diaA, mesA, anoA] = a.data.split('/');
                const [horaA, minutoA] = a.hora.split(':');
                const dataHoraA = new Date(anoA, mesA - 1, diaA, horaA, minutoA);

                const [diaB, mesB, anoB] = b.data.split('/');
                const [horaB, minutoB] = b.hora.split(':');
                const dataHoraB = new Date(anoB, mesB - 1, diaB, horaB, minutoB);

                return dataHoraA - dataHoraB;
            });
            
            const partidasComNomesJogadores = await Promise.all(
                proximasPartidas.map(async (partida) => {
                    const nomesJogadores = await Promise.all(
                        (partida.jogadoresConfirmados || []).map(async (idJogador) => {
                            const jogador = await JogadoresService.buscar(idJogador);
                            return jogador ? jogador.nome : 'Jogador Desconhecido';
                        })
                    );
                    return { ...partida, nomesJogadores: nomesJogadores.join(', ') };
                })
            );

            setPartidas(partidasComNomesJogadores);
        } catch (error) {
            console.error("Erro ao carregar partidas:", error);
            alert("Erro ao carregar partidas. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            carregarPartidas();
        }
    }, [isFocused]);

    const renderPartidaItem = ({ item }) => (
        <Card style={styles.cardItem}>
            <Card.Title
                title={item.nome}
                subtitle={`${item.data} - ${item.hora}`}
                left={(props) => <List.Icon {...props} icon="soccer" />}
            />
            <Card.Content>
                <Text style={styles.cardText}>Tipo: {item.tipo}</Text>
                <Text style={styles.cardText}>Local: {item.local}</Text>
                <Text style={styles.cardText}>Jogadores: {item.jogadores} por time</Text>
                {item.obs && <Text style={styles.cardText}>Obs: {item.obs}</Text>}
                {item.nomesJogadores && <Text style={styles.cardText}>Confirmados: {item.nomesJogadores}</Text>}
            </Card.Content>
        </Card>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text variant="headlineLarge" style={styles.headline}>Bem-vindo ao Pelada FC!</Text>
            </View>

            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.sectionTitle}>Últimas Notícias</Text>
                    <Text style={styles.cardText}>
                        Fique por dentro das novidades do mundo do futebol e das próximas partidas!
                    </Text>
                    <Button
                        mode="text"
                        onPress={() => console.log('Ver Notícias')}
                        style={styles.cardButton}
                    >
                        Ver Notícias
                    </Button>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.sectionTitle}>Gerenciar Partidas</Text>
                    <Text style={styles.cardText}>
                        Crie, edite e acompanhe todas as suas partidas agendadas.
                    </Text>
                    <Button
                        mode="contained"
                        icon="calendar-plus"
                        onPress={() => navigation.navigate('PartidasScreen')}
                        style={styles.cardButton}
                    >
                        Ir para Partidas
                    </Button>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.sectionTitle}>Gerenciar Jogadores</Text>
                    <Text style={styles.cardText}>
                        Cadastre e organize seus jogadores para as partidas.
                    </Text>
                    <Button
                        mode="contained"
                        icon="account-group"
                        onPress={() => navigation.navigate('JogadoresScreen')}
                        style={styles.cardButton}
                    >
                        Ir para Jogadores
                    </Button>
                </Card.Content>
            </Card>

            <Text variant="titleLarge" style={styles.sectionTitle}>Próximas Partidas</Text>
            {loading ? (
                <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
            ) : (
                partidas.length === 0 ? (
                    <Text style={styles.noDataText}>Nenhuma partida agendada. Adicione uma nova!</Text>
                ) : (
                    <FlatList
                        data={partidas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderPartidaItem}
                        contentContainerStyle={styles.partidasList}
                        scrollEnabled={false}
                    />
                )
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    headline: {
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    card: {
        marginVertical: 10,
        width: '100%',
        elevation: 4,
        borderRadius: 8,
    },
    cardItem: {
        marginVertical: 5,
        width: '100%',
        elevation: 2,
        borderRadius: 8,
        borderLeftWidth: 5
    },
    cardText: {
        marginBottom: 5,
    },
    cardButton: {
        marginTop: 15,
        alignSelf: 'flex-start',
    },
    sectionTitle: {
        marginTop: 10,
        marginBottom: 10,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    partidasList: {
        paddingBottom: 20,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});