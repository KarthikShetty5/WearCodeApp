import React, { useEffect } from 'react'
import { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import { View, Text } from 'react-native'
import { useGetProductQuery } from '../store/apiSlice'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import CartListItem from '../components/CartListItem'
import { Pressable } from 'react-native'
import { ScrollView } from 'react-native'
import { cartSlice } from '../store/cartSlice';
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from '../store/apiSlice';
import { useStripe } from '@stripe/stripe-react-native';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { toast } from 'react-toastify';

import { useNavigation } from '@react-navigation/native'
import pincode from '../../pincodes.json'




const Checkout = ({ route }) => {
    let pins = JSON.stringify(pincode)
    const navigation = useNavigation();
    // const [tok, setTok] = useState(null);
    let value = null;

    useEffect(() => {
        get();
    }, [])

    const showToast = (text, color) => {
        Toast.show({
            type: `${color}`,
            text1: `${text}`,
            visibilityTime: 4000,
        });
    };

    const get = async () => {
        try {
            val = await SecureStore.getItemAsync('token')
            value = val
            if (!value) {
                navigation.navigate("Login")
            }
        } catch (err) {
            console.error(err);
        }
    }


    const dispatch = useDispatch();
    const [ref, setRef] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const id = route.params.id;
    const size = route.params.size
    const { data, isLoading, error } = useGetProductQuery(id);
    const product = data?.data;
    const deliveryFee = 80
    const subtotal = 1000


    //  payment Gateway
    let delFee = 15;
    let total = product.price
    let subt = total > 200 ? (total) : (total + delFee)
    const [createOrder, { data1, error1, isLoading1 }] = useCreateOrderMutation();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const onCheckout = async () => {
        // 1. Create a payment intent
        const response = await createPaymentIntent({
            amount: Math.floor(total * 100),
        });
        if (response.error) {
            Alert.alert('Something went wrong');
            return;
        }
        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'WearCode',
            paymentIntentClientSecret: response.data.paymentIntent,
        });
        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert('Something went wrong');
            return;
        }
        // 3. Present the Payment Sheet from Stripe
        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse.error) {
            Alert.alert(
                `Error code: ${paymentResponse.error.code}`,
                paymentResponse.error.message
            );
            return;
        }

        // 4. If payment ok -> create the order
        onCreateOrder();
    };

    const onCreateOrder = async () => {
        const result = await createOrder({
            items: [{ //i have done this to compromise my shopping cart 
                product: {
                    "id": product._id,
                    "image": product.image,
                    "price": product.price,
                    "name": product.name,
                    "description": product.description,
                    "size": size
                }, quantity: 1
            }
            ],
            subtotal: subt,
            deliveryFee: delFee,
            total,
            customer: {
                name: name,
                email: email,
                pincode: pincode,
                address: address,
                phone: phone,
                city: city,
                state: state,
            },
        });

        if (result.data?.status === 'OK') {
            showToast("Order has been submitted", "success");
            showToast(`Your order reference is: ${result.data.data.ref}`, "info")
            dispatch(cartSlice.actions.clear());
            setName('');
            setEmail('');
            setAddress('');
            setPhone('');
            setCity('');
            setState('');
            setPincode('')
            setTimeout(() => {
                navigation.navigate('Track Order');
            }, 3000);
        }
    };

    return (
        <>
            <ScrollView>
                <View>
                    <Text style={styles.text}>Delivery Details</Text>
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
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={(phone) => setPhone(phone)}
                            placeholder="Phone"
                        />
                        <TextInput
                            style={styles.input1}
                            value={pincode}
                            keyboardType='numeric'
                            maxLength={6}
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
                </View>
                <View>
                    <Text style={styles.text}>Review the items</Text>
                    <View style={styles.container1}>
                        <Text style={{ marginLeft: 30 }}>Name</Text>
                        <Text style={{ marginLeft: 26 }}>Image</Text>
                        <Text style={{ marginLeft: 15 }}>Price</Text>
                        <Text style={{ marginLeft: -10 }}>Size</Text>
                    </View>
                    <View style={styles.container1}>
                        <Text style={{ marginLeft: 10 }}>______________________________________________________</Text>
                    </View>
                    <View style={styles.container1}>
                        <Text style={{ paddingLeft: 20 }}>{product.name}</Text>
                        <Image source={{ uri: product.image }} style={{ width: 70, aspectRatio: 1 }} />
                        <Text>{product.price}</Text>
                        <Text>{size}</Text>
                    </View>
                </View>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <Pressable onPress={() => { onCheckout() }} style={styles.button} disabled={(name && phone && email && address) ? false : true}>
                {
                    !(name && phone && email && address) ? <Text style={styles.buttonText} onPress={() => showToast("Please fill details ...", "error")}>Pay</Text> :
                        <Text style={styles.buttonText}>{isLoading && <ActivityIndicator />} Pay  ${subt}</Text>
                }
            </Pressable>
        </>
    )
}


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
        gap: 50
    },
    image: {
        width: '40%',
        aspectRatio: 1,
    },
    name: {
        fontWeight: '500',
        fontSize: 18,
    },
    size: {
        fontSize: 16,
        color: 'gray',
    },
});
export default Checkout
