import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import { View, Text } from 'react-native'
import { useGetUserQuery } from '../store/apiSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MyAccount = () => {
    const [value, setValue] = useState('')
    const getter = async () => {
        try {
            val = await AsyncStorage.getItem('email')
                .then(val => {
                    if (val != null) {
                        setValue(val)
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getter();
    }, [])
   
    const { data, isLoading, error } = useGetUserQuery(value);
    const user = data?.data;

    const [name, setName] = useState("");
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.text}>My Account</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input1}
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            placeholder="Email"
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        placeholder="Address"
                    />
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={phone}
                            onChangeText={(phone) => setPhone(phone)}
                            placeholder="Phone"
                        />
                        <TextInput
                            style={styles.input1}
                            value={pincode}
                            onChangeText={(pincode) => setPincode(pincode)}
                            placeholder="PinCode"
                        />
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={state}
                            onChangeText={(state) => setState(state)}
                            placeholder="State"
                        />
                        <TextInput
                            style={styles.input1}
                            value={city}
                            onChangeText={(text) => setCity(text)}
                            placeholder="City"
                        />
                    </View>
                    <Pressable onPress={() => { console.log("hdhdjd") }} style={styles.button}>
                        <Text style={styles.buttonText}>Change</Text>
                    </Pressable>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.text}>Change Password</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Old Password"
                        />
                        <TextInput
                            style={styles.input1}
                            value={password}
                            onChangeText={(email) => setPassword(email)}
                            placeholder="New Password"
                        />
                    </View>
                    <Pressable onPress={() => { console.log("hdhdjd") }} style={styles.button}>
                        <Text style={styles.buttonText}>Change</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
    text: {
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 500,
        fontSize: 25
    },
    input: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    input1: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        width: '47%',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    container: {
        // padding: 10,
        // paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    container2: {
        paddingLeft: 6,
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
    },
    container1: {
        // padding: 10,
        // paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        gap: 70
    },
    button: {
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        padding: 10,
        borderColor: '#000',
        backgroundColor: '#000',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 4
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
});

export default MyAccount
