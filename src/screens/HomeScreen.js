import { useNavigation } from '@react-navigation/native';
import { Text, View, Image } from 'react-native'
import { useWindowDimensions } from 'react-native';

const HomeScreen = () => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation()
    return (
        <>
            <View>
                <Image source={{ uri: 'https://i.pinimg.com/originals/c2/85/7c/c2857c58c581091b67f7d5720d68acf3.png' }} style={{ width, aspectRatio: 1 }} />
            </View>
            <View style={{ flex: 1 }}>
                {/* <View><Text>my text</Text></View> */}
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}><Text onPress={() => { navigation.navigate("ProductScreen") }}>My fixed footer</Text></View>
            </View>
        </>
    )
}

export default HomeScreen
