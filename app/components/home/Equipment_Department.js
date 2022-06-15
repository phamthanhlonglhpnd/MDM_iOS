import { useNavigation, useRoute, StackActions } from '@react-navigation/core'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import APIManager from '../../controller/APIManager'
import EquipmentItem from './components/EquipmentItem'
import Constant from '../../controller/Constant'
import Loading from '../customs/Loading'


const DepartmentList = () => {

    const navigation = useNavigation()
    const route = useRoute();
    const [equipments, setEquipments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllEquipments = () => {
        APIManager.getAllEquipmentsByDepartment(route.params.id)
            .then(equipments => setEquipments(equipments))
            .catch(error => {
                Alert.alert('Thông báo', error?.message)
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false))
    }

    const goToInventory = (title, id, model, serial) => {
        navigation.dispatch(
            StackActions.push(Constant.nameScreen.EquipmentInventoryInput, { title, id, model, serial })
        )
    }

    useFocusEffect(
        useCallback(() => {
            getAllEquipments()
            return () => {

            }
        }, [])
    )

    const renderItem = ({ item }) => {
        return (
            <EquipmentItem 
                item={item} 
                onPress={() => goToInventory(item.title, item.id, item.model, item.serial)} 
            />
        )
    }

    return (
        isLoading ? <Loading /> :
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.title}</Text>
            <FlatList 
                data={equipments}
                renderItem={renderItem}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{
                    paddingTop: 12
                }}
            />
        </View>
    )
}

export default DepartmentList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20, 
        backgroundColor: '#F2F6FE'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold'
    }
})
