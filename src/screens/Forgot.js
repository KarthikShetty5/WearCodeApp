import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetUserQuery } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


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
                <Text style={styles.heading}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TouchableOpacity style={styles.loginButton} onPress={() => submit()}>
                    <Text style={styles.loginButtonText}>Submit</Text>
                </TouchableOpacity>
                <Text>{exists ? <Text style={{ color: "green" }}>Email sent</Text> : <Text style={{ color: "red" }}>User dont exists</Text>}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 100,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#FF0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 80,
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 135,
        marginBottom: 7
    },
    text1: {
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 170,
        marginBottom: 25
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Forgot;
