import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import NotificationItem from './NotificationItem'
import APIManager from '../../controller/APIManager'
import Loading from '../customs/Loading'


const NotificationList = () => {

    const [notificationList, setNotificationList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const getAllNotification = () => {
            APIManager.getAllNotification()
                .then(notification => {
                    setNotificationList(notification)
                })
                .catch(error => {
                    alert(error?.message)
                    setIsLoading(false)
                })
                .finally(() => setIsLoading(false))
        }

        getAllNotification();
        
        return () => {

        }
    }, [])

    const renderItem = ({ item }) => {
        return (
            <NotificationItem item={item} />
        )
    }

    return (
        isLoading ? <Loading /> :
        <SafeAreaView style={styles.container}>
            <FlatList
                data={notificationList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
            />
        </SafeAreaView>
    )
}

export default NotificationList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FE'
    },
    flatListContent: {
        // paddingTop: 12
    }
})
