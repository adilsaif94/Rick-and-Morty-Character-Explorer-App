import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const rotationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the rotation animation
        Animated.loop(
            Animated.timing(rotationValue, {
                toValue: 1,
                duration: 2000, // Duration for one complete rotation
                useNativeDriver: true,
            })
        ).start();

        // Navigate to Home screen after 10 seconds
        const timeout = setTimeout(() => {
            navigation.replace('HomePage');
        }, 1800); // 10 seconds

        // Cleanup timeout on component unmount
        return () => clearTimeout(timeout);
    }, [rotationValue, navigation]);

    const rotate = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../Assets/image/ricky.png')} // Replace with your image path
                style={[styles.image, { transform: [{ rotate }] }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Set your background color
    },
    image: {
        width: 150,
        height: 150, // Set your image dimensions
    },
});

export default SplashScreen;
