import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { useNavigation, useRoute, StackActions } from '@react-navigation/core'
import Constant from '../../controller/Constant';
import Ionicons from 'react-native-vector-icons/Ionicons'
import APIManager from '../../controller/APIManager';

const bgColor = 'rgba(0, 0, 0, 0.2)'

const ImageScanner = () => {

    const navigation = useNavigation()
    const cameraRef = useRef()
    const [flash, setFlash] = useState(false)
    const route = useRoute()
    const isScanTabbar = route.params?.isScanTabbar
    const isScanning = useRef(true)

    const getIDFromQRCodeResult = (text = '') => {
        const list = text.split("---")
        const result = list.filter(e => e.toLowerCase().includes('id:'))
        if (result.length > 0) {
            const id = result[0].replace("ID:", '').replace(/\s+/g, '')
            return id
        }
        return null
    }

    const isNumberOnly = (str) => {
        const pattern = /^\d+$/
        return pattern.test(str)
    }

    const _onBarCodeRead = (event) => {
        console.log(event?.data)
        if (isScanning.current === true) {
            if (event?.data != null && getIDFromQRCodeResult(event?.data) != null) {
                isScanning.current = false
                navigation.dispatch(
                    StackActions.push(Constant.nameScreen.EquipmentDetails, { equipmentId: getIDFromQRCodeResult(event?.data) })
                )
            }
        }
    }

    const _onStatusChange = (event) => {
        if (event.cameraStatus !== 'NOT_AUTHORIZED') {
            return
        }
        Alert.alert('Thông báo', 'Vui lòng cấp quyền truy cập camera để quét mã QR code!',
            [
                {
                    text: 'No',
                    onPress: () => {
                        navigation.goBack()
                    }
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        Linking.openSettings()
                    }
                }
            ]
        )
    }

    const didClickBack = () => {
        if (isScanTabbar) {
            navigation.navigate(Constant.nameScreen.TabBar, { screen: Constant.nameScreen.Home })
            return
        }
        navigation.goBack()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            isScanning.current = true
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                captureAudio={false}
                autoFocus='on'
                flashMode={flash ? 'torch' : 'off'}
                androidCameraPermissionOptions={{
                    title: 'Cấp quyền truy cập camera',
                    message: 'Vui lòng cấp quyền truy cập camera để sử dụng chức năng này!',
                    buttonPositive: 'Đồng ý',
                    buttonNegative: 'Hủy',
                }}
                onBarCodeRead={_onBarCodeRead}
                onStatusChange={_onStatusChange}
            >
                <View style={styles.cameraView}>
                    <View style={styles.backView}>
                        <TouchableOpacity
                            onPress={didClickBack}
                            style={{
                                ...styles.closeButton,
                            }}
                        >
                            <Ionicons
                                name='chevron-back'
                                size={28}
                                color='white'
                            />
                            <Text style={styles.scanText}>
                                Scan
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, backgroundColor: bgColor }} />
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{ flex: 1, backgroundColor: bgColor }} />
                            <View style={styles.contentView}>
                                <Image
                                    style={styles.scanFrameImg}
                                />
                            </View>
                            <View style={{ flex: 1, backgroundColor: bgColor }} />
                        </View>
                        <View style={{ flex: 1, backgroundColor: bgColor }} />
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => setFlash(!flash)}>
                            <Ionicons
                                name={flash ? 'flash' : 'flash-off'}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: bgColor, paddingBottom: 24 }} />
                </View>
            </RNCamera>
        </View>
    )
}

export default ImageScanner

const styles = StyleSheet.create({
    scanFrameImg: {
        width: Constant.screen.width - 120,
        height: Constant.screen.width - 120,
    },
    closeButton: {
        paddingLeft: 12,
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomView: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: bgColor
    },
    funcIcon: {
        height: 48,
        width: 48
    },
    funcTitle: {
        fontSize: 16,
        color: 'white',
    },
    funcView: {
        alignItems: 'center',
    },
    camera: {
        flex: 1,
    },
    contentView: {
    },
    titleText: {
        fontSize: 16,
        color: 'white',
        paddingTop: 10,
        backgroundColor: bgColor,
        textAlign: 'center'
    },
    cameraView: {
        flex: 1,
    },
    backView: {
        backgroundColor: bgColor
    },
    scanText: {
        fontSize: 30,
        color: 'white',
        marginLeft: 12
    }
})
