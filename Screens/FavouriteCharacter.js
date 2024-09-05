import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FavouriteCharacter = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Failed to load favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const deleteFavorite = async (characterId) => {
        try {
            const updatedFavorites = favorites.filter(fav => fav.id !== characterId);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Failed to delete favorite:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Favorites...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Your Favourite Character</Text>
            {favorites.length === 0 ? (
                <Text style={styles.noFavoritesText}>No favorite characters saved.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ViewCharacter', { characterId: item.id })}
                            style={styles.characterCard}
                        >
                            <Image source={{ uri: item.image }} style={styles.characterImage} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.characterName}>{item.name}</Text>
                                <Text style={styles.characterSpecies}>{item.species}</Text>
                            </View>
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity onPress={() => deleteFavorite(item.id)}>
                                    <AntDesign name="delete" size={22} color="#f51d31" style={{marginRight:10}} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <AntDesign name="heart" size={22} color="#f51d31" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 20,
        color: '#666',
        fontWeight: '500',
        padding: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
        color: '#666',
    },
    noFavoritesText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        color: '#666',
    },
    characterCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 3,
        flexDirection: 'row',
    },
    characterImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    characterName: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#666',
    },
    characterSpecies: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    iconsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
});

export default FavouriteCharacter;
