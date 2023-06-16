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
import { useNavigation } from '@react-navigation/native'



const Checkout = ({ route }) => {
    const navigation = useNavigation();
    const [tok, setTok] = useState();
    // const get = async () => {
    //     try {
    //         val = await AsyncStorage.getItem('email')
    //             .then((val) => {
    //                 setTok(val);
    //             }
    //             )
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     get();
    //     console.log(!tok)
    //     if (!tok) {
    //         navigation.navigate("Login")
    //     }
    // }, [])



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
    const { data, isLoading, error } = useGetProductQuery(id);
    const product = data?.data;
    const deliveryFee = 80
    const subtotal = 1000

    //  payment Gateway
    let total = product.price
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
            items: product,
            subtotal,
            deliveryFee,
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
            Alert.alert(
                'Order has been submitted',
                `Your order reference is: ${result.data.data.ref}`
            );
            dispatch(cartSlice.actions.clear());
            setName('');
            setEmail('');
            setAddress('');
            setPhone('');
            setCity('');
            setState('');
            setPincode('')
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
                </View>
                <View>
                    <Text style={styles.text}>Review the items</Text>
                    <View style={styles.container1}>
                        <Text style={{ paddingLeft: 20 }}>{product.name}</Text>
                        <Image source={{ uri: product.image }} style={{ width: 70, aspectRatio: 1 }} />
                        <Text>{product.price}</Text>
                    </View>
                </View>
            </ScrollView>
            <Pressable onPress={() => { onCheckout() }} style={styles.button}>
                <Text style={styles.buttonText}>
                    Place Order
                    {isLoading && <ActivityIndicator />}
                </Text>
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
        gap: 70
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
