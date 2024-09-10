import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';

const UserDashboard = ({ route, navigation }) => {
    const { userName } = route.params || { userName: 'User' }; 

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => {
                        
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignIn' }],
                        });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../Assets/image/logo.png')} style={styles.logo} />
            <Text style={styles.topHeading}>Welcome {userName} !</Text>
            <TouchableOpacity style={styles.buttonView} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 18,
        alignItems: 'center'
    },
    logo: {
        width: 230,
        height: 170,
        marginTop: 10,
    },
    topHeading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8,
        marginTop: 60
    },
    buttonView: {
        backgroundColor: '#A3CFFF',
        padding: 13,
        borderRadius: 32,
        marginTop: 20,
        shadowColor: '#94C7FF',
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 6, 
        elevation: 8, 
        width: '100%',
        marginTop: '40%'
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '700',
        color: '#092A4D'
    },
});
