import { Alert, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        StatusBar.setTranslucent(false); 
        StatusBar.setBackgroundColor('#ffffff');
        StatusBar.setBarStyle('dark-content');

        return () => {

        };
    }, []);

    const handleSignUp = async () => {
        if (!name || !phone || !password) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        try {
            const response = await fetch('https://tor.appdevelopers.mobi/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone,
                    password,
                    name,
                }),
            });

            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = { message: 'Unexpected response format' };
            }

            if (response.ok) {
                Alert.alert('Success', 'User registered successfully!');
                navigation.navigate('SignIn');
            } else {
                Alert.alert('Error', data.error?.phone?.[0] || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration Error:', error);
            Alert.alert('Error', 'Something went wrong, please try again later');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Image source={require('../../Assets/image/logo.png')} style={styles.logo} />
                <Text style={styles.topHeading}>Sign Up</Text>
                <Text style={styles.contentText}>Fill in the below form and add life to</Text>
                <Text style={styles.contentText}>your car!</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputHeading}>Name</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={21} color="#808080" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#808080"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
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

                <View style={styles.inputGroup}>
                    <Text style={styles.inputHeading}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Feather name="lock" size={23} color="#808080" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            placeholderTextColor="#808080"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Ionicons name="eye-outline" size={23} color="#808080" style={styles.icon} />
                    </View>
                </View>

                <View style={styles.checkboxView}>
                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#797979" />
                    <Text style={[styles.termCond, { color: '#000000' }]}>Agree with</Text>
                    <Text style={[styles.termCond, { color: '#c2bebf', textDecorationLine: 'underline' }]}>Terms & Conditions</Text>
                </View>

                <TouchableOpacity onPress={handleSignUp} style={styles.buttonView}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.bottomTextView}>
                    <Text style={[styles.bottomText, { color: '#808080' }]}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignIn') }}>
                        <Text style={[styles.bottomText, { color: 'black', fontWeight: '800', marginLeft: 5, textDecorationLine: 'underline' }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomHeadingView}>
                    <Text style={styles.bottomHeadingText}>By login or sign up, you agree to our terms of use and</Text>
                    <Text style={styles.bottomHeadingText}>privacy policy</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 18,
    },
    innerContainer: {
        justifyContent: 'center',
    },
    logo: {
        width: 230,
        height: 170,
        marginTop: 10,
        alignSelf: 'center',
    },
    topHeading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8,
    },
    contentText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#808080',
    },
    inputHeading: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000000',
    },
    inputGroup: {
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 8,
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#000000',
    },
    checkboxView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    termCond: {
        fontWeight: '500',
        fontSize: 13,
        marginLeft: 7,
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
        color: '#092A4D',
    },
    bottomTextView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15,
    },
    bottomText: {
        fontSize: 14,
    },
    bottomHeadingView: {
        marginTop: 20,
        alignSelf: 'center',
    },
    bottomHeadingText: {
        fontSize: 12,
        alignSelf: 'center',
        fontWeight: '500',
        color: '#808080',
    },
});
