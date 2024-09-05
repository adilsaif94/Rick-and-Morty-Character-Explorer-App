import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
       <Image style={{ width: 130, height: 130, }} source={require('../Assets/image/ricky.png')} />
      <Text style={styles.title}>Character Categories</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CharacterListPage',{ type: 'all' })}>
          <View style={styles.cardContent}>
            <Icon name="users" size={30} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>All Characters</Text>
          </View>
          <AntDesign name='arrowright' size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CharacterListPage',{ type: 'alive' })}>
          <View style={styles.cardContent}>
            <Icon name="heartbeat" size={30} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Alive Characters</Text>
          </View>
          <AntDesign name='arrowright' size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CharacterListPage',{type: 'dead'})}>
          <View style={styles.cardContent}>
            <MaterialCommunityIcons name="emoticon-dead" size={32} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Dead Characters</Text>
          </View>
          <AntDesign name='arrowright' size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FavouriteCharacter')}>
          <View style={styles.cardContent}>
            <MaterialCommunityIcons name="cards-heart" size={32} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Favourite Characters</Text>
          </View>
          <AntDesign name='arrowright' size={24} color="#fff" />
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop:30
  },
  cardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#69c706',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
