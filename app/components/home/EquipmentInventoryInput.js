import { useNavigation, useRoute, StackActions } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Constant from '../../controller/Constant'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Loading from '../customs/Loading'
import StorageManager from '../../controller/StorageManager'
import { requestInventoryAPI } from '../../controller/APIService'

const EquipmentInventoryInput = () => {

    const route = useRoute()
    const equipmentId = route.params?.id ?? ''
    const equipmentName = route.params?.name || route.params?.title
    const equipmentModel = route.params?.model ?? ''
    const equipmentSerial = route.params?.serial ?? ''
    const equipmentStatus = route.params?.status ?? ''
    const [note, setNote] = useState(equipmentStatus === 'liquidated' ? 'Thiết bị đã được thanh lý' : '')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()

    const showNotification = (id, title, body) => {
        PushNotificationIOS.addNotificationRequest({
            id: id,
            title: title,
            body: body
        })
    }

    const onSuccessed = () => {
        setIsLoading(false);
        showNotification(
            'success',
            'Gửi ghi chú kiểm kê thiết bị thành công!',
            'Vui lòng xem chi tiết ở mục lịch sử kiểm kê của thiết bị!'
        )
        setNote("");
    
        navigation.dispatch(
            StackActions.push(Constant.nameScreen.EquipmentDetails, { equipmentId })
        )
    }

    const onFailed = () => {
        showNotification(
            'fail',
            'Gửi yêu cầu kiểm kê thiết bị thất bại!',
            'Vui lòng kiểm tra lại!'
        )
        setNote("");
        setIsLoading(false)
    }

    const requestInventory = async () => {
        if (note === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập ghi chú kiểm kê!')
            return
        }
        setIsLoading(true)
        try {
            let domain = await StorageManager.getData(Constant.keys.domain);
            await requestInventoryAPI(domain, equipmentId, note);
            onSuccessed();
            setIsLoading(false)
        } catch (error) {
            Alert.alert('Thông báo', error?.message);
            onFailed();
            setIsLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            setIsLoading(false)
        }
    }, [])


    return (
        isLoading ? <Loading /> :
            <View style={styles.rootView}>
                <ScrollView>
                    <Text style={styles.name}>
                        {equipmentName}
                    </Text>
                    <View style={styles.number}>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Model</Text>
                            <Text style={styles.value}>{equipmentModel}</Text>

                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Serial</Text>
                            <Text style={styles.value}>{equipmentSerial}</Text>
                        </View>
                    </View>
                    {
                        equipmentStatus !== 'liquidated' ?
                            <View style={styles.noteView}>
                                <TextInput
                                    style={styles.noteInput}
                                    value={note}
                                    multiline
                                    onChangeText={text => setNote(text)}
                                    placeholder='Nhập ghi chú kiểm kê tại đây...'
                                />
                            </View> :
                            <View style={styles.liquidatedView}>
                                <Text>Ghi chú tự động</Text>
                                <TextInput
                                    style={styles.liquidatedInput}
                                    multiline
                                    value={note}
                                />
                            </View>
                    }

                    <TouchableOpacity
                        onPress={requestInventory}
                        style={styles.requestTouch}>
                        <Text style={styles.requestText}>
                            Kiểm kê
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
    )
}

export default EquipmentInventoryInput

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        paddingHorizontal: 16
    },
    requestDes: {
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 6,
        textAlign: 'center'
    },
    name: {
        alignSelf: 'center',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        color: Constant.color.text,
        fontWeight: 'bold'
    },
    noteTitle: {
        marginTop: 10
    },
    noteView: {
        backgroundColor: 'white',
        marginTop: 16,
        borderRadius: 8,
        height: 250,
        paddingHorizontal: 10
    },
    requestText: {
        color: 'white',
        fontSize: 16
    },
    requestTouch: {
        height: 44,
        backgroundColor: Constant.color.main,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        alignSelf: 'center',
        marginTop: 30,
    },
    liquidatedView: {
        marginTop: 30
    },
    liquidatedInput: {
        backgroundColor: '#E1E1E5',
        marginTop: 5,
        borderRadius: 8,
        height: 30,
        paddingHorizontal: 10
    },
    number: {
        backgroundColor: '#FFF4EB',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 10
    },
    title: {
        marginBottom: 8,
        color: Constant.color.text
    },
    value: {
        fontSize: 16,
        color: '#323E6D',
        fontWeight: 'bold'
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
