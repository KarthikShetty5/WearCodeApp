import React from 'react'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native'
import { View, Text } from 'react-native'
import { useGetProductQuery } from '../store/apiSlice'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import CartListItem from '../components/CartListItem'
import { Pressable } from 'react-native'
import { ScrollView } from 'react-native'

const Checkout = ({ route }) => {
    const [ref, setRef] = useState('');
    const id = route.params.id;
    const { data, isLoading, error } = useGetProductQuery(id);
    const product = data?.data;

    console.log(product)
    return (
        <>
            <ScrollView>
                <View>
                    <Text style={styles.text}>Delivery Details</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={ref}
                            onChangeText={setRef}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input1}
                            value={ref}
                            onChangeText={setRef}
                            placeholder="Email"
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={ref}
                        onChangeText={setRef}
                        placeholder="Address"
                    />
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={ref}
                            onChangeText={setRef}
                            placeholder="Phone"
                        />
                        <TextInput
                            style={styles.input1}
                            value={ref}
                            onChangeText={setRef}
                            placeholder="PinCode"
                        />
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input1}
                            value={ref}
                            onChangeText={setRef}
                            placeholder="State"
                        />
                        <TextInput
                            style={styles.input1}
                            value={ref}
                            onChangeText={setRef}
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
            <Pressable onPress={() => console.log("buy now")} style={styles.button}>
                <Text style={styles.buttonText}>
                    Place Order
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
