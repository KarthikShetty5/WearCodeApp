import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from './screens/ProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ShoppingCart from './screens/ShoppingCart';
import { Pressable, Text } from 'react-native';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectNumberOfItems } from './store/cartSlice';
import TrackOrder from './screens/TrackOrder';
import HomeScreen from './screens/HomeScreen';
import Tshirt from './screens/Tshirt';
import Checkout from './screens/Checkout';
import ProfilePage from './screens/ProfilePage';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MyAccount from './screens/MyAccount';
import Hoodies from './screens/Hoodies';
import Stickers from './screens/Stickers';
import ContactScreen from './screens/ContactScreen';
import { Image } from 'react-native';
import ModalScreen from './screens/ModalScreen';
import Forgot from './screens/Forgot';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);

  return (
    <NavigationContainer>
      {/* root component */}
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      // it sets color to view that renders item
      >
        <Stack.Screen
          component={HomeScreen} name="WearCode" title=""
          options={({ navigation }) => ({
            headerTitle: () => (null),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={{ flexDirection: 'row' }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <Image source={require("../assets/playstore3.png")} style={{ width: 150, height: 50, resizeMode: "contain" }} />
            ),
          })}

        />
        <Stack.Screen
          name="Shoes"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={{ flexDirection: 'row' }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
            // headerLeft: () => (
            //   <MaterialCommunityIcons
            //     onPress={() => navigation.navigate('Track Order')}
            //     name="truck-delivery"
            //     size={22}
            //     color="gray"
            //   />
            // ),

          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: 'modal' }}
        // modal repsresnts way it should appear when we touch on it in products
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="Track Order" component={TrackOrder} />
        <Stack.Screen name="Tshirt" component={Tshirt} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Myaccount" component={MyAccount} />
        <Stack.Screen name="Hoodies" component={Hoodies} />
        <Stack.Screen name="Stickers" component={Stickers} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="app" component={ModalScreen} />
        <Stack.Screen name="forgot" component={Forgot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
