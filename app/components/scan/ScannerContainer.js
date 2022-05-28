import React from 'react'
import { StackActions, useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import { View } from 'react-native';
import Constant from '../../controller/Constant';

const ScannerContainer = () => {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.addListener('focus', () => {
            navigation.dispatch(
                StackActions.push(Constant.nameScreen.ImageScanner, { isScanTabbar: true })
            )
        })
    }, [])

    return (
        <View />
    );
}

export default ScannerContainer