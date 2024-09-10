import { Alert, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignIn = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        StatusBar.setTranslucent(false); 
        StatusBar.setBackgroundColor('#ffffff');
        StatusBar.setBarStyle('dark-content'); 
    }, []);

    const handleSignIn = async () => {
        if (!phone || !password) {
            Alert.alert('Error', 'Phone and password are required');
            return;
        }
        try {
            const response = await fetch('https://tor.appdevelopers.mobi/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone,
                    password,
                }),
            });
            const data = await response.json();
            if (response.ok && data.status) {
                Alert.alert('Success', 'Login successful!');
                navigation.navigate('UserDashboard', { userName: data.data.name }); 
            } else {
                Alert.alert('Error', data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'Something went wrong, please try again later');
        }
    };



    return (
        <View style={styles.container}>
            <Image source={require('../../Assets/image/logo.png')} style={styles.logo} />
            <Text style={styles.topHeading}>Sign In</Text>
            <Text style={styles.contentText}>Hi! Welcome back, you</Text>
            <Text style={styles.contentText}>have been missed</Text>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.inputHeading}>Phone</Text>
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="phone-outline" size={23} color="#808080" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#808080"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType='phone-pad'
                    />
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.inputHeading}>Password</Text>
                <View style={styles.inputContainer}>
                    <Feather name="lock" size={23} color="#808080" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#808080"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true} // Hide password
                    />
                    <Ionicons name="eye-outline" size={23} color="#808080" style={styles.icon} />
                </View>
            </View>
            <Text style={styles.forgot}>Forgot password?</Text>
            <TouchableOpacity onPress={handleSignIn} style={styles.buttonView}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.lineText}>or</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.iconView}>
                <Image source={require('../../Assets/image/google.png')} style={styles.iconBottom} />
                <Image source={require('../../Assets/image/apple.png')} style={styles.iconBottom} />
            </View>
            <View style={styles.bottomTextView}>
                <Text style={[styles.bottomText, { color: '#808080' }]}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                    <Text style={[styles.bottomText, { color: 'black', fontWeight: '800', marginLeft: 5, textDecorationLine: 'underline' }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomHeadingView}>
                <Text style={styles.bottomHeadingText}>By login or sign up, you agree to our terms of use and</Text>
                <Text style={styles.bottomHeadingText}>privacy policy</Text>
            </View>
        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 18,
    },
    logo: {
        width: 230,
        height: 170,
        marginTop: 10,
        alignSelf: 'center'
    },
    topHeading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8
    },
    contentText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#808080'
    },
    inputHeading: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000000'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 8
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#000000'
    },
    forgot: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000000',
        marginTop: 5,
        textDecorationLine: 'underline',
        alignSelf: 'flex-end'
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
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '700',
        color: '#092A4D'
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 40
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#A3CFFF',
    },
    lineText: {
        marginHorizontal: 10,
        fontSize: 15,
        color: '#666161',
    },
    iconView: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    iconBottom: {
        height: 43,
        width: 43,
        marginHorizontal: 15
    },
    bottomTextView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 25
    },
    bottomText: {
        fontSize: 14,
    },
    bottomHeadingView: {
        alignSelf: 'center',
        marginTop: 20
    },
    bottomHeadingText: {
        fontSize: 12,
        alignSelf: 'center',
        fontWeight: '500',
        color: '#808080'
    }
});
