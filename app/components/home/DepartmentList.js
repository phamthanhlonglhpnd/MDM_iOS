import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList, StyleSheet, Alert, View } from 'react-native'
import DepartmentItem from './components/DepartmentItem'
import Loading from '../customs/Loading'
import StorageManager from '../../controller/StorageManager'
import Constant from '../../controller/Constant'
import { getAllDepartmentsAPI } from '../../controller/APIService'

const DepartmentList = () => {

    const navigation = useNavigation()
    const [departments, setDepartments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllDepartments = async () => {
        try {
            let domain = await StorageManager.getData(Constant.keys.domain);
            let response = await getAllDepartmentsAPI(domain);
            setDepartments(response);
            setIsLoading(false);
        } catch (error) {
            Alert.alert('Thông báo', error?.message);
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllDepartments()
            return () => {

            }
        }, [])
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Khoa phòng'
        })
    }, [])

    const renderItem = ({ item }) => {
        return (
            <DepartmentItem item={item} />
        )
    }

    return (
        isLoading ? <Loading /> :
        <View style={styles.container}>
            <FlatList
                data={departments}
                renderItem={renderItem}
                keyExtractor={(item) => item?.id}
            />
        </View>
    )
}

export default DepartmentList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#EBF3FE',
        flex: 1,
        paddingVertical: 20
    },
})
