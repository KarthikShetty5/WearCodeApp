import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetUserQuery } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image } from 'react-native';


const Forgot = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [exists, setExists] = useState(false)
    let value = false;
    const { data, isLoading, error } = useGetUserQuery(email);

    useEffect(() => {
        if (data?.data.email) {
            value = true
        } else {
            value = false
        }
    })


    const submit = () => {
        if (value) {
            setExists(true);
        } else {
            setExists(false);
        }
        setEmail("")
        setTimeout(() => {
            navigation.navigate("Login")
        }, 1500)
        setTimeout(() => {
            setExists(false)
        }, 6000)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/wearcode.jpg')}
                        style={{ width: 100, height: 100, borderRadius: 400 / 2 }}
                    />
                </View>
                <Text style={styles.heading}>Forgot Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={submit}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
                <Text>{exists ? <Text style={{ color: "green" }}>Email sent</Text> : <Text style={{ color: "red" }}>User dont exists</Text>}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db', // Background color
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
    },

    heading: {
        fontWeight: '900',
        fontSize: 24,
        marginBottom: 28
    },

    text: {
        color: 'red',
        paddingRight: 160
    },

    text1: {
        color: 'red',
        paddingRight: 195,
        paddingBottom: 20,
        paddingTop: 10
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 25,
        paddingLeft: 10,
        padding: 10,
    },
    loginButton: {
        backgroundColor: '#2980b9',
        padding: 8,
        borderRadius: 30,
        width: '50%',
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Forgot;
