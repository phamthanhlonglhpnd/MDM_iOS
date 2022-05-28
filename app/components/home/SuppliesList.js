import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import APIManager from '../../controller/APIManager'
import EquipmentItem from './components/EquipmentItem'
import Loading from '../customs/Loading'

const SuppliesList = () => {

    const navigation = useNavigation()
    const [supplies, setSupplies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllEquipments = () => {
        APIManager.getAllSupplies()
            .then(supplies => setSupplies(supplies))
            .catch(error => {
                alert(error?.message)
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getAllEquipments()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Vật tư'
        })
    }, [])

    const renderItem = ({ item }) => {
        return (
            <EquipmentItem item={item} />
        )
    }

    return (
        isLoading ? <Loading /> :
        <View style={{ flex: 1 }}>
            <FlatList
                data={supplies}
                renderItem={renderItem}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{
                    paddingVertical: 20
                }}
            />
        </View>
    )
}

export default SuppliesList

const styles = StyleSheet.create({

})
