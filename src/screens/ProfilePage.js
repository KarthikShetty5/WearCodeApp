import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useGetUserTokQuery } from '../store/apiSlice';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { toast } from 'react-toastify';


const ProfilePage = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState('')

    const showToast = (text, color) => {
        Toast.show({
            type: `${color}`,
            text1: `${text}`,
            visibilityTime: 4000,
        });
    };

    const getter = async () => {
        try {
            val = await AsyncStorage.getItemAsync('token')
                .then(val => {
                    if (val != null) {
                        setValue(val)
                    } else {
                        setValue('')
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }

    const { data, isLoading, error } = useGetUserTokQuery(value);

    useEffect(() => {
        getter();
    }, [])


    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            showToast("Logged out", "success");
            setTimeout(() => {
                navigation.navigate("WearCode")
            }, 2000);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: 'https://th.bing.com/th?id=OIP.Gfp0lwE6h7139625a-r3aAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' }}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.profileName}>{(data?.data.name) ? (data?.data.name) : "Unknown"} {isLoading && <ActivityIndicator />}</Text>
                </View>
                <TouchableOpacity style={styles.profileSection} onPress={() => { navigation.navigate("Login") }}>
                    <Text style={styles.sectionTitle}>Login</Text>
                    <Text style={styles.sectionSubtitle}>View your order history</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileSection} onPress={() => { navigation.navigate("Myaccount") }}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <Text style={styles.sectionSubtitle}>Change password and other details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Wishlist</Text>
                    <Text style={styles.sectionSubtitle}>View your saved items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileSection} onPress={() => { navigation.navigate("Contact") }}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <Text style={styles.sectionSubtitle}>Manage your account settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileSection} onPress={() => { logout() }} >
                    <Text style={styles.sectionTitle}>Logout</Text>
                </TouchableOpacity>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileSection: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#777',
    },
});

export default ProfilePage;
