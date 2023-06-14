import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useGetOrderQuery } from '../store/apiSlice';
import BottomNavi from '../components/BottomNavi';

const TrackOrder = () => {
  const [ref, setRef] = useState('');
  const { data, isLoading, error } = useGetOrderQuery(ref);
  // da = orders.items[0].product

  return (
    <>
      <ScrollView style={styles.root}>
        <TextInput
          style={styles.input}
          value={ref}
          onChangeText={setRef}
          placeholder="Your order reference"
        />

        {isLoading && <ActivityIndicator />}
        {data?.status !== 'OK' && <Text>Order not found</Text>}
        {data?.status === 'OK' && (
          <Text>{JSON.stringify(data.data, null, 2)}</Text>
        )}
      </ScrollView>
      <BottomNavi />

      {/* <View style={styles.container}>
        <Image source={{ uri: data.data.image }} style={styles.image} />

        <View style={styles.contentContainer}>
          <Text style={styles.name}>{data.product.name}</Text>
          <Text style={styles.size}>Size {data.data.size}</Text>
        </View>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
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

export default TrackOrder;
