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
  TouchableWithoutFeedback,
} from 'react-native';
import products from '../data/products';
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';
import { useGetProductQuery } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import Footer from '../components/Footer';

const CIRCLE_SIZE = 30;
const CIRCLE_RING_SIZE = 2;

const ProductDetailsScreen = ({ route }) => {
  const colors = [
    '#6874e7',
    '#b8304f',
    '#758E4F',
    '#fa3741',
    '#F26419',
  ];
  const size = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];




  const [value, setValue] = useState(0);
  const [pin, setPin] = useState('')
  // const sheet = React.useRef();

  // React.useEffect(() => {
  //   sheet.current.open();
  // }, []);

  const id = route.params.id;
  const navigation = useNavigation();

  const { data, isLoading, error } = useGetProductQuery(id);

  const product = data?.data;

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  //it takes size of screen and send it to window


  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
    // console.warn("added to cart")
  };

  const checkPin = () => {
    if (pin === '123456') {
      console.log("Yes deliverable")
    } else {
      console.log("No deliverable")
    }
    setPin("")
  }

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
          <Text style={styles.price}>₹ {product.price}</Text>

          {/* size selector */}
          <View style={styles.group}>
            {size.map((item, index) => {
              const isActive = value === index;
              return (
                <View key={item}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setValue(index);
                    }}>
                    <View
                      style={[
                        styles.circle,
                        isActive && { borderColor: "black" },
                      ]}>
                      <Text
                        style={[styles.circleInside, { backgroundColor: "gray" }]}
                      >{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>

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

          {/* Pincode button */}
          <Text style={styles.heading}>Check Delivery</Text>
          <View style={styles.container1}>
            <TextInput
              style={styles.input}
              placeholder="Enter Pincode"
              onChangeText={(text) => { setPin(text) }}
              value={pin}
            />
            <Pressable onPress={() => { checkPin() }} style={styles.button}>
              <Text style={styles.buttonText}>Check</Text>
            </Pressable>
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <Footer />
      </ScrollView>

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
    bottom: 2,
    width: '45%',
    alignSelf: 'center',
    padding: 14,
    borderRadius: 100,
    alignItems: 'center',
    marginRight: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  buttons: {
    position: 'relative',
    flexDirection: 'row',
    paddingLeft: 4,
    bottom: 18,
    SpaceBetween: 3,
    paddingTop: 35,
  },
  group: {
    flexDirection: 'row',
    paddingTop: 18,
    paddingLeft: -1,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: 'white',
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: 'transparent',
    marginRight: 2,
    marginBottom: 12,
  },
  circleInside: {
    paddingTop: 2,
    textAlign: 'center',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  container1: {
    flex: 1,
    gap: 4,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 1,
    flexDirection: 'row'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '60%',
    height: 43,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  button: {
    width: "30%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    padding: 10,
    borderColor: '#000',
    backgroundColor: '#000',
    marginBottom: 20,
  }
});

export default ProductDetailsScreen;
