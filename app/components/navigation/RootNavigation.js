import React, { useEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabBarNavigation from './TabBarNavigation';
import Constant from '../../controller/Constant';
import Login from '../authentication/Login';
import EquipmentList from '../home/EquipmentList';
import StaffList from '../home/StaffList';
import EquipmentDetails from '../home/EquipmentDetails';
import DepartmentList from '../home/DepartmentList';
import StorageManager from '../../controller/StorageManager';
import AppManager from '../../controller/AppManager';
import UserModel from '../../model/UserModel';
import ErrorRequest from '../home/ErrorRequest';
import ErrorInfoInput from '../home/ErrorInfoInput';
import EquipmentInventory from '../home/EquipmentInventory';
import SuppliesList from '../home/SuppliesList';
import EquipmentInventoryInput from '../home/EquipmentInventoryInput';
import OnBoarding from '../authentication/OnBoarding';
import Scan from '../scan/Scan';
import Equipment_Department from '../home/Equipment_Department';
import EquipmentInventoryResult from '../home/EquipmentInventoryResult';
import EquipmentErrorResult from '../home/EquipmentErrorResult';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {

    const [screen, setScreen] = useState(null)

    useEffect(() => {
        StorageManager.getData(Constant.keys.currentUser)
            .then(data => {
                if (data == null) {
                    setScreen(Constant.nameScreen.OnBoarding)
                    return
                }
                AppManager.shared.currentUser = new UserModel(data)
                setScreen(Constant.nameScreen.TabBar)
            })
            .catch(() => setScreen(Constant.nameScreen.OnBoarding))
    }, [])

    return (
        screen == null ?
            <View /> :
            <SafeAreaProvider>
                <StatusBar backgroundColor={Constant.color.bgColor} barStyle='dark-content' />
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={screen}
                    >
                        <Stack.Screen
                            name={Constant.nameScreen.OnBoarding}
                            component={OnBoarding}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.Login}
                            component={Login}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.TabBar}
                            component={TabBarNavigation}
                            options={{
                                headerShown: false,
                                gestureEnabled: false
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.EquipmentList}
                            component={EquipmentList}
                            screenOptions={{
                                headerShown: true
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.StaffList}
                            component={StaffList}
                            screenOptions={{
                                headerShown: true
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.EquipmentDetails}
                            component={EquipmentDetails}
                            screenOptions={{
                                headerShown: true,
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.DepartmentList}
                            component={DepartmentList}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.Equipment_Department}
                            component={Equipment_Department}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.ErrorRequest}
                            component={ErrorRequest}
                            options={{
                                title: 'Báo hỏng'
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.EquipmentErrorResult}
                            component={EquipmentErrorResult}
                            options={{
                                title: 'Báo hỏng'
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.Scan}
                            component={Scan}
                            options={{
                                presentation: 'fullScreenModal'
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.ErrorInfoInput}
                            component={ErrorInfoInput}
                            options={{
                                title: 'Báo hỏng'
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.EquipmentInventory}
                            component={EquipmentInventory}
                            options={{
                                title: 'Kiểm kê'
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.SuppliesList}
                            component={SuppliesList}
                            options={{
                                title: 'Vật tư'
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.EquipmentInventoryInput}
                            component={EquipmentInventoryInput}
                            options={{
                                title: 'Kiểm kê'
                            }}
                        />
                        <Stack.Screen
                            name={Constant.nameScreen.EquipmentInventoryResult}
                            component={EquipmentInventoryResult}
                            options={{
                                title: 'Kiểm kê'
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
    )
}

export default RootNavigation
