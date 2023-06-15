import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCreateUserMutation } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [createUser, { data, error, isLoading }] = useCreateUserMutation();

    const submit = async () => {
        console.log(email, password)
        const result = await createUser({
            name: name,
            email: email,
            password: password
        });
        console.log(result);
        if (result.data?.status === 'OK') {
            Alert.alert(
                'User Created',
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SignIn</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
            />
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
            <TouchableOpacity style={styles.loginButton} onPress={submit}>
                <Text style={styles.loginButtonText}>SignUp</Text>
            </TouchableOpacity>
        </View>
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
        width: '100%',
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#FF0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignUp;
