import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import NotificationItem from './NotificationItem'
import APIManager from '../../controller/APIManager'
import Loading from '../customs/Loading'
import { useDispatch } from 'react-redux'
import { resetCount } from '../../store/slice/appSlice'

const NotificationList = ({ navigation }) => {

    const [notificationList, setNotificationList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    
    const getAllNotification = () => {
        APIManager.getAllNotification()
            .then(notification => {
                setNotificationList(notification)
            })
            .catch(error => {
                Alert.alert('Thông báo', error?.message)
                setIsLoading(false)
            })
            .finally(() => setIsLoading(false))
    }

    useFocusEffect(
        useCallback(() => {
            getAllNotification()
            return () => {

            }
        }, [])
    )

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            dispatch(resetCount())
        });
    
        return unsubscribe;
      }, [navigation]);

    const renderItem = ({ item }) => {
        return (
            <NotificationItem item={item} />
        )
    }

    return (
        isLoading ? <Loading /> :
        <View style={styles.container}>
            <FlatList
                data={notificationList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    )
}

export default NotificationList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FE',
        paddingVertical: 20
    },
})
