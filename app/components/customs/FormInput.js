import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export default function FormInput({label, error, onChangeText, onBlur, onFocus, value, appendComponent, secureTextEntry}) {
    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.label}>{label}</Text>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
            <View style={{flexDirection: 'row',}}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    autoFocus={false}
                />
                {appendComponent}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#DDDDDD',
        width: "100%",
        borderRadius: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        color: 'black',
        paddingVertical: 20
    },
    label: {
        color: 'black',
        fontSize: 16
    }
})
