import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const InfoItem = ({
    value,
    icon
}) => {
    return (
        <View style={styles.contentView}>
            <Ionicons
                name={icon}
                size={16}
                style={styles.icon}
            />
            <Text>
                {value}
            </Text>
        </View>
    )
}

export default InfoItem

const styles = StyleSheet.create({
    contentView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 4
    }
})
