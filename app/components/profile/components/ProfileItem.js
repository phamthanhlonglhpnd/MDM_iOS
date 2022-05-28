import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProfileItem = ({
    value,
    size = 24,
    icon,
    onPress
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.contentView}>
            <Ionicons
                name={icon}
                size={size}
                style={styles.icon}
            />
            <Text>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

export default ProfileItem

const styles = StyleSheet.create({
    contentView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 12
    },
    icon: {
        marginRight: 6
    }
})
