import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import products from '../data/products';
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';
import { useGetProductQuery } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const navigation = useNavigation();

  const { data, isLoading, error } = useGetProductQuery(id);
  console.log(data)

  const product = data?.data;

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  //it takes size of screen and send it to window


  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
    // console.warn("added to cart")
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching the product. {error.error}</Text>;
  }
  // const product = products[0]
  return (
    <View>
      <ScrollView>
        {/* it is added bcoz description gopes down and u cant see it and also the image to go up when we scroll it  , inorder to nsee we did */}
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal //we want view in horizontal mode so
          showsHorizontalScrollIndicator={false} //it is used to remove scroll indicator
          pagingEnabled //centers them and close images in center
        />

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttons}>
        {/* Add to cart button */}
        <Pressable onPress={addToCart} style={styles.button1}>
          {/* it handles press events */}
          <Text style={styles.buttonText}>Add to cart</Text>
        </Pressable>
        <Pressable onPress={() => { navigation.navigate("Checkout", { id: id }) }} style={styles.button1}>
          {/* it handles press events */}
          <Text style={styles.buttonText}>Buy Now</Text>
        </Pressable>
      </View>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
    paddingBottom: 40,
  },

  button1: {
    backgroundColor: 'black',
    bottom: 30,
    width: '45%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginRight: 8
  },
  // button2: {
  //   backgroundColor: 'black',
  //   bottom: 30,
  //   width: '30%',
  //   alignSelf: 'center',
  //   padding: 15,
  //   borderRadius: 100,
  //   alignItems: 'center',
  //   marginLeft: 8
  // },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  buttons: {
    position: 'relative',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 30,
    SpaceBetween: 3
  }
});

export default ProductDetailsScreen;
