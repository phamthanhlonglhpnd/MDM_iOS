import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function Loading() {
    return (
        <View 
            style={styles.container}
        >
            <View>
                <ActivityIndicator size="large" color="#FFA133" number={30}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})