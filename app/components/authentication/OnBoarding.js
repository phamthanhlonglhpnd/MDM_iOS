import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import backgroundOnBoarding from '../../assets/images/backgroundOnBoarding.png';
import hospitalLogo from '../../assets/images/kienan.jpg';
import loginBackGround from '../../assets/images/img_logo.png';

export default function OnBoarding({ navigation }) {

    useFocusEffect(
        useCallback(() => {
            const navigateToLogin = () => {
                setTimeout(() => {
                    navigation.navigate('Login')
                }, 3000)
            }
            navigateToLogin();
        }, [navigation])
    )

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={backgroundOnBoarding}
                style={styles.backgroundOnBoarding}
            />
            <View style={styles.content}>
                <View style={styles.introApp}>
                    <Image
                        source={hospitalLogo}
                        style={styles.hospitalLogo}
                    />
                    <Text style={styles.nameApp}>MDM</Text>
                </View>
                <Image
                    style={styles.image}
                    source={loginBackGround}
                />
                <View style={{ marginTop: 40}}>
                    <Text style={styles.title}>Quản lý thiết bị và vật tư y tế</Text>
                    <Text style={styles.title}>Bệnh viện Kiến An</Text>
                </View>
            </View>
            <View style={{marginBottom: 20}}>
                <Text style={[styles.text, { color: 'black'}]}>Waiting for 3 seconds</Text>
                <Text style={[styles.text, { color: 'black'}]}>Or Press: </Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.text}>Let's Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    backgroundOnBoarding: {
        height: 500,
        width: "100%",
        position: 'absolute',
        top: -180
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    hospitalLogo: {
        height: 60, 
        width: 60,
        borderRadius: 20,
        marginRight: 20
    },
    introApp: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center',
        marginTop: 20
    }, 
    nameApp: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FF6C44'
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 65
    },
    button: {
        backgroundColor: '#FF6C44',
        height: 50,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 20,
        paddingVertical: 10
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }, 
    title: {
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    }
})
