import { useNavigation, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native';
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


                <Image source={{ uri: 'https://i.pinimg.com/originals/c2/85/7c/c2857c58c581091b67f7d5720d68acf3.png' }} style={{ width, aspectRatio: 1 }} />

                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>
                <Text>jhcdiodiji</Text>

                <Footer />

            </ScrollView>
            <BottomNavi />
        </>
    )
}

export default HomeScreen
