import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AppManager from '../../controller/AppManager'
import Constant from '../../controller/Constant'
import CategoryItem from './components/CategoryItem'

const Home = () => {

    const navigation = useNavigation();

    const userInfo = AppManager.shared.currentUser;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesome5 name='bars' size={25} color='black'/>
                </TouchableOpacity>
                <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Trang chủ</Text>
                <Image
                    source={{
                        uri: userInfo?.profile_photo_url
                    }}
                    style={styles.image}
                />
            </View>
            <FlatList
                data={Constant.homeData}
                renderItem={({ item }) => <CategoryItem item={item} />}
                keyExtractor={(item) => item.title}
                numColumns={2}
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 20
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'red'
    }
})
