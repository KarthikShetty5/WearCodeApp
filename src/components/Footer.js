import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://th.bing.com/th?id=OIP.DCgfEJDZZDka6j0wAAPFrAHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' }}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.text}>&copy; 2023 Your eCommerce Website. All rights reserved.</Text>
            <Text style={styles.text}>Return Policy | Terms of Service | Privacy Policy</Text>
            <View style={styles.paymentLogos}>
                <Image
                    source={{ uri: 'https://th.bing.com/th?id=OIP.DCgfEJDZZDka6j0wAAPFrAHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' }}
                    style={styles.paymentLogo}
                    resizeMode="contain"
                />
                <Image
                    source={{ uri: 'https://th.bing.com/th?id=OIP.pL0yAs7O-twbB-41n4VngAHaEc&w=322&h=193&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' }}
                    style={styles.paymentLogo}
                    resizeMode="contain"
                />
                <Image
                    source={{ uri: 'https://th.bing.com/th?id=OIP.uxJ7Kv7YXFuaJMD1R-RsWgHaCU&w=350&h=109&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' }}
                    style={styles.paymentLogo}
                    resizeMode="contain"
                />
                <Image
                    source={{ uri:'https://th.bing.com/th/id/OIP.TQkOkUCjNbd_NTUKFq-9QAHaCB?w=299&h=95&c=7&r=0&o=5&dpr=1.3&pid=1.7'}}
                    style={styles.paymentLogo}
                    resizeMode="contain"
                />
                {/* Add more payment logos using online URLs */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 150,
        height: 50,
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        color: '#777',
        marginBottom: 5,
    },
    paymentLogos: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paymentLogo: {
        width: 30,
        height: 20,
        marginHorizontal: 5,
    },
});

export default Footer;
