import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert, LogBox } from 'react-native'
import FastImage from 'react-native-fast-image'
import Constant from '../../controller/Constant'
import Loading from '../customs/Loading'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logo from '../../assets/images/img_logo.png'
import StorageManager from '../../controller/StorageManager'
import { getAEquipmentAPI, getInventoryByEquipmentIdAPI } from '../../controller/APIService'

const EquipmentDetails = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const equipmentId = route.params?.equipmentId ?? ''
    const [equipment, setEquipment] = useState();
    const [historyInventory, setHistoryInventory] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])

    const onRequestError = () => {
        navigation.dispatch(
            StackActions.push(Constant.nameScreen.ErrorInfoInput, { id: equipmentId, name: equipment?.title, model: equipment?.model, serial: equipment?.serial })
        )
    }

    const onRequestInventory = () => {
        navigation.dispatch(
            StackActions.push(Constant.nameScreen.EquipmentInventoryInput, { id: equipmentId, name: equipment?.title, model: equipment?.model, serial: equipment?.serial, status: equipment?.status })
        )
    }

    const getAEquipment = async () => {
        if (equipmentId === '') {
            return
        }
        try {
            let domain = await StorageManager.getData(Constant.keys.domain);
            let response = await getAEquipmentAPI(domain, equipmentId);
            if (response?.status === "active") {
                setIsActive(true);
            }
            setEquipment(response);
            setIsLoading(false);
        } catch (error) {
            Alert.alert('Thông báo', error?.message);
            setIsLoading(false);
        }
    }

    const getHistoryInventory = async () => {
        if (equipmentId === '') {
            return
        }
        try {
            let domain = await StorageManager.getData(Constant.keys.domain);
            let response = await getInventoryByEquipmentIdAPI(domain, equipmentId);
            setIsLoading(false);
            setHistoryInventory(response);
        } catch (error) {
            Alert.alert('Thông báo', error?.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAEquipment();
        getHistoryInventory();
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Thiết bị',
        })
    }, [equipment])

    const getStatus = () => {
        const list = Constant.equipmentStatus.filter(e => e?.key?.toLowerCase() === equipment?.status?.toLowerCase())
        if (list.length > 0) {
            return list[0]?.value
        }
        return ''
    }

    const getStatusStyle = (status) => {
        let statusStyle = {
            backgroundColor: 'black',
            statusColor: 'white'
        }

        if (status === 'not_handed' || status === 'active') {
            statusStyle.backgroundColor = '#E8FFF5';
            statusStyle.statusColor = '#A0E4C6';
        }
        if (status === 'was_broken' || status === 'corrected') {
            statusStyle.backgroundColor = '#FFEDEE';
            statusStyle.statusColor = '#FB7C7C';
        }
        if (status === 'inactive' || status === 'liquidated') {
            statusStyle.backgroundColor = '#B7C0D7';
            statusStyle.statusColor = 'gray';
        }
        return statusStyle;
    }

    return (
        isLoading ? <Loading /> :
            <KeyboardAwareScrollView style={styles.rootView}>
                <View style={styles.top}>
                    {
                        equipment?.urlImg ?
                            <FastImage
                                source={{ uri: equipment?.urlImg }}
                                style={styles.image}
                                resizeMode='cover'
                            /> :
                            <Image
                                source={logo}
                                style={styles.image}
                            />
                    }
                    <Text style={styles.name}>
                        {equipment?.title}
                    </Text>
                    <View style={[
                        styles.boxStatus,
                        {
                            backgroundColor: `${getStatusStyle(equipment?.status).backgroundColor}`,
                        }
                    ]}>
                        <Text style={
                            [
                                styles.status,
                                {
                                    color: `${getStatusStyle(equipment?.status).statusColor}`
                                }
                            ]
                        }>{getStatus()}</Text>
                    </View>
                    <View style={styles.number}>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Model</Text>
                            <Text style={styles.value}>{equipment?.model}</Text>

                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Serial</Text>
                            <Text style={styles.value}>{equipment?.serial}</Text>
                        </View>
                    </View>
                    <View style={styles.year}>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Năm sản xuất</Text>
                            <Text style={styles.value}>{equipment?.year_manufacture}</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Năm sử dụng</Text>
                            <Text style={styles.value}>{equipment?.year_use}</Text>
                        </View>
                    </View>
                    <View style={styles.origin}>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Hãng sản xuất</Text>
                            <Text style={styles.value}>{equipment?.manufacturer}</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Xuất xứ</Text>
                            <Text style={styles.value}>{equipment?.origin}</Text>
                        </View>
                    </View>
                </View>
                {
                    equipment?.reason ?
                        <View style={styles.history}>
                            <Text style={styles.historyTitle}>Lịch sử báo hỏng thiết bị</Text>
                            <View style={styles.historyInventoryItem}>
                                <View style={styles.detail}>
                                    <Text style={styles.title}>Lí do</Text>
                                    <Text style={styles.value}>{equipment?.reason}</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.title}>Thời gian</Text>
                                    <Text style={styles.value}>{equipment?.date_failure}</Text>
                                </View>
                            </View>
                        </View> : <View />
                }
                <View style={styles.history}>
                    <Text style={styles.historyTitle}>Lịch sử kiểm kê thiết bị</Text>
                    {
                        historyInventory.length > 0 ?
                            <FlatList
                                data={historyInventory}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.historyInventoryItem}>
                                            <View style={styles.detail}>
                                                <Text style={styles.title}>Ghi chú</Text>
                                                <Text style={styles.value}>{item?.note}</Text>
                                            </View>
                                            <View style={styles.detail}>
                                                <Text style={styles.title}>Thời gian</Text>
                                                <Text style={styles.value}>{item?.date}</Text>
                                            </View>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item?.id}
                            />
                            :
                            <Text>Thiết bị chưa được kiểm kê</Text>

                    }
                </View>
                {
                    isActive ?
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={onRequestError}
                                style={styles.bell}
                            >
                                <Text style={styles.text}>Báo hỏng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onRequestInventory}
                                style={styles.bell}
                            >
                                <Text style={styles.text}>Kiểm kê</Text>
                            </TouchableOpacity>
                        </View>
                        :

                        <TouchableOpacity
                            onPress={onRequestInventory}
                            style={styles.bellPlus}
                        >
                            <Text style={styles.text}>Kiểm kê</Text>
                        </TouchableOpacity>
                }
            </KeyboardAwareScrollView>
    )
}

export default EquipmentDetails

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: '#EBF3FE',
        position: 'relative',
    },
    top: {
        backgroundColor: 'white',
        marginVertical: 30,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 25
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
    name: {
        color: Constant.color.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'center',
        textAlign: 'center'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: (Constant.screen.width - 300) / 2,
        justifyContent: 'space-around'
    },
    bell: {
        width: 120,
        height: 50,
        backgroundColor: '#FFDE73',
        marginVertical: 20,
        position: 'relative',
        borderRadius: 40
    },
    bellPlus: {
        height: 50,
        backgroundColor: '#FFDE73',
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 40,
        marginTop: 5,
        marginBottom: 20,
        overflow: 'hidden'
    },
    text: {
        textAlign: 'center',
        paddingTop: 12,
        fontSize: 16
    },
    boxStatus: {
        borderRadius: 15,
        width: 135,
        paddingVertical: 8,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    status: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    number: {
        backgroundColor: '#FFF4EB',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 10
    },
    year: {
        backgroundColor: '#E9EAFF',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 10
    },
    origin: {
        backgroundColor: '#FFEDEE',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 10
    },
    history: {
        paddingHorizontal: 20,
        marginBottom: 30
    },
    historyTitle: {
        color: '#323E6D',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    historyInventoryItem: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 12
    },
})
