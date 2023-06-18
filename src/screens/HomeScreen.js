import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { useWindowDimensions } from 'react-native';
import Footer from '../components/Footer';
import BottomNavi from '../components/BottomNavi';

const HomeScreen = () => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation()
    const { colors } = useTheme();
    const CATEGORIES = [
        "Tshirt",
        "Hoodies",
        "Stickers",
        "Mugs",
        "Shoes"
    ];

    const isSelected = 0;
    return (
        <>
            <ScrollView>
                <FlatList
                    data={CATEGORIES}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingVertical: 9,
                        gap: 8,
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(item)}
                                style={{
                                    backgroundColor: isSelected ? colors.primary : colors.card,
                                    paddingHorizontal: 17,
                                    paddingVertical: 9,
                                    borderRadius: 100,
                                    borderWidth: isSelected ? 0 : 1,
                                    borderColor: colors.border,
                                }}
                            >
                                <Text
                                    style={{
                                        color: isSelected ? colors.background : colors.text,
                                        fontWeight: "600",
                                        fontSize: 14,
                                        opacity: isSelected ? 1 : 0.5,
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                <Image source={require("../../assets/image21.jpg")} style={{ width: "100%", height: 300 }} />


                <View style={styles.container}>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 1</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.ago4sLRNIhAleWONLO7nIAHaJC?pid=ImgDet&rs=1" }}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 2</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.t9_sRU5N3ig39SNlqOYjTAHaJQ?pid=ImgDet&w=512&h=640&rs=1" }}
                            style={styles.logo}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 1</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.3bVXd9X_96x0RKXMd78GhAHaJQ?pid=ImgDet&w=193&h=241&c=7&dpr=1.3" }}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 2</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.LI4MkXtLwqvW_EVspEyFLgHaJl?pid=ImgDet&rs=1" }}
                            style={styles.logo}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 1</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.UEcLqjVotR44tTl3v6mN6AHaIr?pid=ImgDet&w=193&h=226&c=7&dpr=1.3" }}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 2</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.zQdc5UM4bUkcylqT1Vmf5AHaHa?w=195&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7" }}
                            style={styles.logo}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 1</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.tBRyOKsvc9CKFmbyqgH4JQHaIP?w=195&h=217&c=7&r=0&o=5&dpr=1.3&pid=1.7" }}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 2</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.sc3nb6wsremRyCqCcyMdzgHaHa?w=195&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7" }}
                            style={styles.logo}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 1</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.WAsSqtU1In0t4jffRP8v3AHaIa?w=195&h=222&c=7&r=0&o=5&dpr=1.3&pid=1.7" }}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.box}>
                        {/* <Text style={styles.text}>Box 2</Text> */}
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.FTqtZQnIJRm-4PnO1zNF4wHaIE?w=195&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7" }}
                            style={styles.logo}
                        />
                    </View>
                </View>

                <Footer />

            </ScrollView>
            <BottomNavi />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange children horizontally
    },
    box: {
        flex: 1, // Each box takes equal width
        height: 150,
        backgroundColor: 'white',
        margin: 5,
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
    text: {
        color: 'black',
        // fontSize: 20,
        marginBottom: 10,
    },
    logo: {
        width: 90,
        height: 90,
    },
});

export default HomeScreen
