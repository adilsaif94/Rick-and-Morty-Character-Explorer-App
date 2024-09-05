import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ViewCharacter = ({ route }) => {
    const { characterId } = route.params;
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
                setCharacter(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [characterId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!character) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Character not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: character.image }} style={styles.characterImage} />
            <Text style={styles.characterName}>{character.name}</Text>
            <Text style={styles.characterDetail}>Status: {character.status}</Text>
            <Text style={styles.characterDetail}>Species: {character.species}</Text>
            <Text style={styles.characterDetail}>Gender: {character.gender}</Text>
            <Text style={styles.characterDetail}>Origin: {character.origin.name}</Text>
            <Text style={styles.characterDetail}>Location: {character.location.name}</Text>
            <Text style={styles.episodesTitle}>Episodes:</Text>
            {character.episode.length > 0 ? (
                character.episode.map((episode, index) => (
                    <Text key={index} style={styles.episode}>
                        {episode}
                    </Text>
                ))
            ) : (
                <Text style={styles.characterDetail}>No episodes available</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'red'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 20,
        color: 'red',
    },
    characterImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    characterName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#666',
    },
    characterDetail: {
        fontSize: 18,
        marginBottom: 5,
        color: '#666',
    },
    episodesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#666',
    },
    episode: {
        fontSize: 16,
        marginBottom: 10,
        color: '#666',
    },
});

export default ViewCharacter;
