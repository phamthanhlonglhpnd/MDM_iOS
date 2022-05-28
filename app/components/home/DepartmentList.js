import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import APIManager from '../../controller/APIManager'
import DepartmentItem from './components/DepartmentItem'
import Loading from '../customs/Loading'

const DepartmentList = () => {

    const navigation = useNavigation()
    const [departments, setDepartments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllDepartments = () => {
        APIManager.getAllDepartments()
            .then(departments => setDepartments(departments))
            .catch(error => {
                alert(error?.message)
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false))
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
        <View style={{ flex: 1 }}>
            <FlatList
                data={departments}
                renderItem={renderItem}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={styles.container}
            />
        </View>
    )
}

export default DepartmentList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20, 
        backgroundColor: '#F2F6FE'
    },
})