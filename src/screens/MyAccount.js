import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import { View, Text } from 'react-native'
import { useGetUserTokQuery } from '../store/apiSlice'
import { ActivityIndicator } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { toast } from 'react-toastify';

const MyAccount = () => {
    const [value, setValue] = useState(null);

    const showToast = (text, color) => {
        Toast.show({
            type: `${color}`,
            text1: `${text}`,
            visibilityTime: 4000,
        });
    };
    const getter = async () => {
        try {
            val = await SecureStore.getItemAsync('token')
                .then(val => {
                    if (val != null) {
                        setValue(val)
                    } else {
                        showToast("Please login", "info");
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }

    const { data, isLoading, error } = useGetUserTokQuery(value);

    useEffect(() => {
        getter();
    }, [])

    const user = data?.data;
    console.log(user)
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <View>
                <Toast ref={(ref) => Toast.setRef(ref)} />

            </View>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.text}>My Account {isLoading && <ActivityIndicator />}</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input1}
                            value={user?.email}
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
        height: 80
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
