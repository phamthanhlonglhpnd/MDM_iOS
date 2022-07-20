import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import Constant from '../../controller/Constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StackActions, useNavigation } from '@react-navigation/native'
import { getAllEquipmentsAPI } from '../../controller/APIService'
import StorageManager from '../../controller/StorageManager'

const ErrorRequest = () => {

    const navigation = useNavigation()
    const [keyword, setKeyword] = useState('');
    const [isRemind, setIsRemind] = useState(true);

    const onSearch = async () => {
        if (keyword === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập thông tin để tìm kiếm!')
            return
        }
        try {
            let domain = await StorageManager.getData(Constant.keys.domain);
            let response = await getAllEquipmentsAPI(domain, keyword);
            let newEquipments = [];
            response.map(equipment => {
                if(equipment.status === "active") {
                    newEquipments.push(equipment);
                }
                return newEquipments;
            })
            if(newEquipments.length === 0) {
                setIsRemind(true)
            } else {
                navigation.dispatch(
                    StackActions.push(Constant.nameScreen.EquipmentErrorResult, { newEquipments })
                );
                
            }
            setIsRemind(false);
            setKeyword("");    
        } catch (error) {
            Alert.alert('Thông báo', error?.message);
            setKeyword("");
        }
    }

    const showImageScanner = () => {
        navigation.dispatch(
            StackActions.push(Constant.nameScreen.Scan)
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Nhập để tìm thiết bị cần báo hỏng
            </Text>
            <View style={styles.equipmentView}>
                <TextInput
                    placeholder='Tên thiết bị, mã thiết bị,..'
                    style={styles.equipmentInput}
                    value={keyword}
                    onChangeText={keyword => setKeyword(keyword)}
                    onFocus={() => setIsRemind(true)}
                />
            </View>
            {
                isRemind ? <View/> :
                <View style={{marginTop: 15}}>
                    <Text style={{color: 'red', textAlign: 'center'}}>Vui lòng nhập thiết bị có trạng thái đang sử dụng</Text>
                </View>
            }
            <TouchableOpacity
                onPress={onSearch}
                style={styles.searchTouch}>
                <Text style={styles.searchText}>
                    Tìm kiếm
                </Text>
            </TouchableOpacity>
            <Text style={styles.title}>
                Hoặc quét mã QR để tìm kiếm:
            </Text>
            <TouchableOpacity
                onPress={showImageScanner}
            >
                <Ionicons
                    name='qr-code'
                    size={70}
                    style={styles.qrCodeIcon}
                />
            </TouchableOpacity>
        </View> 
    )
}

export default ErrorRequest

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#EBF3FE',
        flex: 1,
        paddingVertical: 20
    },
    title: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        color: Constant.color.text
    },
    equipmentInput: {
        height: 56,
        backgroundColor: 'white',
        borderRadius: 40,
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 16,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    },
    equipmentView: {
        marginHorizontal: 20,
        marginTop: 15
    },
    searchText: {
        color: 'white',
        fontSize: 16
    },
    searchTouch: {
        height: 44,
        backgroundColor: Constant.color.main,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        alignSelf: 'center',
        marginTop: 30,
        overflow: 'hidden'
    },
    qrCodeIcon: {
        alignSelf: 'center',
        marginTop: 30,
        color: Constant.color.text
    },
    equipmentList: {
        marginVertical: 15,
        marginHorizontal: 15
    }
})
