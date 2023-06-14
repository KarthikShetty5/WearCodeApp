import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const BottomNavi = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("WearCode")}>
                <Icon name="home" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Icon name="bars" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("Profile")}>
                <Icon name="user" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("Track Order")}>
                <Icon name="truck" size={20} color="#000" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default BottomNavi;
