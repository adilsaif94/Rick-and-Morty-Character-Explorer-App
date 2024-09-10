import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, Dimensions, Text, TouchableOpacity } from 'react-native';


const Welcome = ({navigation}) => {



    return (
        <View style={styles.container}>
            <Image source={require('../../Assets/image/image1.png')} style={styles.image1} resizeMode="cover" />
            <Image source={require('../../Assets/image/image2.png')} style={styles.image2} resizeMode="cover" />
            <Image source={require('../../Assets/image/logo.png')} style={styles.logo} resizeMode="contain" />
            <View style={styles.titleView}>
                <Text style={styles.titleText}>Sparkle & Shine Transform</Text>
                <Text style={styles.titleText}>Your Drive with Every Wash!</Text>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}} style={styles.buttonView}>
                <Text style={styles.buttonText}>Let’s Start</Text>
            </TouchableOpacity>
            <View style={styles.bottomTextView}>
                <Text style={[styles.bottomText,{color:'#808080'}]}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}><Text style={[styles.bottomText,{color:'black', fontWeight: '800',marginLeft:5,textDecorationLine:'underline'}]}>Sign in</Text></TouchableOpacity>
            </View>
        </View>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    image1: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    image2: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    logo: {
        width: 360,
        height: 250,
        marginTop: '60%',
        alignSelf: 'center'
    },
    titleView: {
        fontSize: 24,
        lineHeight: 36,
        alignSelf: 'center',
        color: '#808080',
        fontWeight: '600',
        marginVertical: 20
    },
    titleText: {
        fontSize: 24,
        lineHeight: 36,
        alignSelf: 'center',
        color: '#808080',
        fontWeight: '600'
    },
    buttonView: {
        backgroundColor: '#A3CFFF',
        padding: 13,
        borderRadius: 32,
        marginHorizontal: 12,
        marginTop: 40,
        shadowColor: '#94C7FF', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Shadow position
        shadowOpacity: 0.8, // Shadow opacity
        shadowRadius: 6, // Shadow blur
        elevation: 8, // Android shadow
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '700',
        color: '#092A4D'
    },
    bottomTextView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop:10
    },
    bottomText: {
        fontSize: 14,
    },
});

export default Welcome;
