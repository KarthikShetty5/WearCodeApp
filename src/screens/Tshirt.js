import { useNavigation } from '@react-navigation/native';
import products from '../data/products'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { productsSlice } from '../store/productsSlice';
import { useGetProductsQuery } from '../store/apiSlice';
import { useEffect } from 'react';

const TshirtScreen = ({ navigation }) => {

    const { data, isLoading, error } = useGetProductsQuery();
    // console.log(data.data)
    console.group(error)
    let tshirt = [];

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error fetching products: {error.error}</Text>;
    }

    const products = data?.data;

    const tshirtgetter = () => {
        products.map((item) => {
            if (item.category == "tshirt") {
                tshirt.push({
                    "id": item._id,
                    "name": item.name,
                    "image": item.image,
                    "price": item.price
                })
            }
        })
    }

    tshirtgetter();

    return (
        <>
            <FlatList
                data={tshirt}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            // update selected product
                            // dispatch(productsSlice.actions.setSelectedProduct(item.id));

                            navigation.navigate('Product Details', { id: item.id });
                        }}
                        style={styles.itemContainer}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.container}>
                            <Text>{item.name}</Text>
                            <FontAwesome5 name="heart" size={15} color="gray" style={{ paddingLeft: 90 }} />
                        </View>
                        <Text style={{ paddingLeft: 10, paddingBottom: 5 }}>₹{item.price}</Text>
                    </Pressable>
                )}
                numColumns={2}
            />
        </>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: '50%',
        padding: 1,
    },
    image: {
        width: '100%',
        // if we want to render it as a square give aspecr ratio,height will be calaculated based on width as aspect ratio is 1
        aspectRatio: 1,
    }
    ,
    container: {
        padding: 10,
        paddingBottom: 0,
        // paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row'
    },
});
export default TshirtScreen;
