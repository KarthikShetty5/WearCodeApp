import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import { useGetOrderQuery } from '../store/apiSlice';
import BottomNavi from '../components/BottomNavi';

const TrackOrder = () => {
  const [ref, setRef] = useState('');
  const { data, isLoading, error } = useGetOrderQuery(ref);
  da = data?.data.items
  // let daa = data?.data
  // console.log(daa.customer)

  return (
    <>
      <ScrollView style={styles.root}>
        <TextInput
          style={styles.input}
          value={ref}
          onChangeText={setRef}
          placeholder="Your order reference"
        />
        {/* <Text style={{ paddingBottom: 30 }}>{JSON.stringify(data?.data, null, 2)}</Text> */}
        {isLoading && <ActivityIndicator />}
        {data?.status !== 'OK' && <Text>Order not found</Text>}
      </ScrollView>
      {data?.status === 'OK' &&
        <FlatList
          data={da}
          renderItem={({ item }) => (
            <>
              <View style={styles.container1}>
                <Image source={{ uri: item.product.image }} style={styles.image} />
                <Text style={styles.text}>Name : {item.product.name}</Text>
                <Text style={styles.text}>Price: {item.product.price}</Text>
                <Text style={styles.text}>Qty  : {item.quantity}</Text>
              </View>
            </>
          )}
          numColumns={2}
        />}

      {/* <BottomNavi /> */}
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
  container1: {
    paddingBottom: 10,
    alignItems: 'flex-start',
    justifyContent: "center",
    paddingTop: 2
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
    width: '50%',
    aspectRatio: 1,
    margin: 15,
  },
  name: {
    fontWeight: '500',
    fontSize: 18,
  },
  size: {
    fontSize: 16,
    color: 'gray',
  },
  text: {
    paddingLeft: 14,
    paddingBottom: 3
  }
});

export default TrackOrder;
