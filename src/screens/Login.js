import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetUserQuery } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data, isLoading, error } = useGetUserQuery(email);
    const user = data?.data;
    // console.log(data?.data.email, data?.data.token)

    const submit = async () => {
        if (email === user?.email) {
            if (password === user.password) {
                console.log("success")
                try {
                    await AsyncStorage.setItem('email', user.email)
                        .then(() => {
                            navigation.navigate("WearCode")
                        }
                        )
                    console.log("setted")
                } catch (err) {
                    console.log("error")
                }
            }
            else {
                console.log("Incorrect Credentials")
            }
        } else {
            console.log("User dont exists")
        }
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
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.text}>Don't have an Account ?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={submit}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
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
        marginBottom: 20
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
