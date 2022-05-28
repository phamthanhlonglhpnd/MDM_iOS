import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Constant from '../../controller/Constant';

export default function SearchInput({ onChangeText, onPress}) {
    return (
        <View 
            style={styles.search}
        >
            <TouchableOpacity 
                style={styles.searchIcon}
                onPress={onPress}
            >
                <FontAwesome5 name='search' size={20} color='black'/>
            </TouchableOpacity> 
            <TextInput
                placeholder='Nhập tên thiết bị, model, serial'
                style={styles.input}
                onChangeText={onChangeText}
                autoFocus={false}
            />          
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        position: 'relative',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: "100%"
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        height: 50,
        width: '90%',
        marginLeft: 30,
        color: Constant.color.text
    },
    searchIcon: {
        position: 'absolute',
        left: 20,
        top: 13,
        flex: 1,
        zIndex: 1
    },

})

