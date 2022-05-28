import { useNavigation, StackActions } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Constant from '../../../controller/Constant'

const space = 20
const widthItem = (Constant.screen.width - space * 3) / 2
const witdthIcon = widthItem * 0.4

const CategoryItem = ({ item }) => {

    const navigation = useNavigation()

    const showEquipmentList = () => {
        if (item?.screen != undefined) {
            navigation.dispatch(
                StackActions.push(item?.screen)
            )
        }
    }

    return (
        <TouchableOpacity
            onPress={showEquipmentList}
            style={{
                ...styles.contentView,
                backgroundColor: item?.color ?? 'white'
            }}>
            <Image
                source={item?.icon}
                style={styles.icon}
                resizeMode='contain'
            />
            <Text style={styles.title}>
                {item?.title}
            </Text>
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    contentView: {
        width: widthItem,
        height: widthItem,
        backgroundColor: 'green',
        marginLeft: space,
        marginBottom: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: 'white',
        marginTop: 4
    },
    icon: {
        width: witdthIcon,
        height: witdthIcon,
        borderRadius: 50
    }
})
