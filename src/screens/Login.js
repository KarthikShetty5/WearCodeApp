import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useGetUserQuery } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { toast } from 'react-toastify';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data, isLoading, error } = useGetUserQuery(email);
    const user = data?.data;

    const showToast = (text, color) => {
        Toast.show({
            type: `${color}`,
            text1: `${text}`,
            visibilityTime: 4000,
            backgroundColor:'green'
        });
    };

    // console.log(data?.data.email, data?.data.token)
    const submit = async () => {
        if (email === user?.email) {
            if (password === user.password) {
                try {
                    await SecureStore.setItemAsync('token', user.token)
                        .then(() => {
                            showToast("Logged in", "success");
                            setTimeout(() => {
                                navigation.navigate("WearCode")
                            }, 2000);
                        }
                        )
                } catch (err) {
                    showToast(err, "error");
                    console.log(err);
                }
            }
            else {
                showToast("Incorrect Credentials", "info");
            }
        } else {
            showToast("User dont exists", "error");
        }
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
                <Text style={styles.heading}>Login</Text>
                <View style={styles.inputContainer}>
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
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.text}>Don't have an Account ?</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                        <Text style={styles.text1}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <TouchableOpacity style={styles.loginButton} onPress={submit}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
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
        marginBottom: 40,
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
        padding: 12,
        borderRadius: 30,
        width: '70%',
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Login;
