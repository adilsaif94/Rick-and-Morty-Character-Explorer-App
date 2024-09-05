import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const CharacterListPage = ({ route, navigation }) => {
    const { type } = route.params;
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [allSpecies, setAllSpecies] = useState([]);
    const [allGenders, setAllGenders] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            let apiUrl = 'https://rickandmortyapi.com/api/character?';

            if (type === 'alive') {
                apiUrl += 'status=alive&';
            } else if (type === 'dead') {
                apiUrl += 'status=dead&';
            }

            if (speciesFilter && speciesFilter !== 'all') {
                apiUrl += `species=${speciesFilter}&`;
            }
            if (genderFilter && genderFilter !== 'all') {
                apiUrl += `gender=${genderFilter}&`;
            }

            try {
                const response = await axios.get(apiUrl);
                setCharacters(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCharacters();
        loadFavorites();
        fetchFilters();
    }, [type, speciesFilter, genderFilter]);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFilters = async () => {
        try {
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            const allSpecies = [...new Set(response.data.results.map(character => character.species))];
            const allGenders = [...new Set(response.data.results.map(character => character.gender))];
            setAllSpecies(['all', ...allSpecies]);
            setAllGenders(['all', ...allGenders]);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleFavorite = async (character) => {
        let updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex(fav => fav.id === character.id);
        
        if (index > -1) {
            updatedFavorites.splice(index, 1);
        } else {
            updatedFavorites.push(character);
        }

        setFavorites(updatedFavorites);
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.filters}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={speciesFilter}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSpeciesFilter(itemValue)}
                    >
                        <Picker.Item label="All Species" value="all" />
                        {allSpecies.map(species => (
                            <Picker.Item key={species} label={species} value={species} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={genderFilter}
                        style={styles.picker}
                        onValueChange={(itemValue) => setGenderFilter(itemValue)}
                    >
                        <Picker.Item label="All Genders" value="all" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Genderless" value="genderless" />
                        <Picker.Item label="Unknown" value="unknown" />
                    </Picker>
                </View>
            </View>
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const isFavorite = favorites.some(fav => fav.id === item.id);

                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ViewCharacter', { characterId: item.id })}
                            style={styles.characterCard}
                        >
                            <Image source={{ uri: item.image }} style={styles.characterImage} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.characterName}>{item.name}</Text>
                                <Text style={styles.characterSpecies}>{item.species}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => toggleFavorite(item)}
                                style={styles.favoriteIcon}
                            >
                                <AntDesign 
                                    name={isFavorite ? 'heart' : 'hearto'} 
                                    size={22} 
                                    color="#f51d31" 
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
    },
    filters: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    pickerContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#666',
    },
    characterCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
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
    favoriteIcon: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
});

export default CharacterListPage;
