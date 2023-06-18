import React from 'react'
import { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'


const ContactScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const submit = () => {
        console.log("hhrhhr")
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Contact Us</Text>
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
                    placeholder="Phone"
                    keyboardType='numeric'
                    maxLength={10}
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                />
                <TextInput
                    style={styles.input2}
                    placeholder="Message"
                    onChangeText={(text) => setMessage(text)}
                    value={message}
                />
                <TouchableOpacity style={styles.loginButton} onPress={submit}>
                    <Text style={styles.loginButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

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
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input2: {
        width: '80%',
        height: 100,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#FF0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 80,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 175,
        marginBottom: 20
    },
});

export default ContactScreen
