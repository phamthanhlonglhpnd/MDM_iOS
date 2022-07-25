import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Constant from '../../controller/Constant';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import NotificationList from '../message/NotificationList';
import Scan from '../scan/Scan';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from '../../store/slice/appSlice';
import { resetCount } from '../../store/slice/appSlice'
import Scan2 from '../scan/Scan2';

const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {

    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    size = 32
                    if (route.name === Constant.nameScreen.Home) {
                        size = 29
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === Constant.nameScreen.NotificationList) {
                        iconName = focused ? 'mail' : 'mail-outline'
                    } else if (route.name === Constant.nameScreen.Scan) {
                        size = 29
                        iconName = focused ? 'qr-code' : 'qr-code-outline'
                    } else {
                        size = 29
                        iconName = focused ? 'person' : 'person-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={Constant.color.main} />
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    height: 85
                },
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 13
                },
                tabBarActiveTintColor: Constant.color.main,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitleStyle: {
                    fontSize: 16
                }
            })}
        >
            <Tab.Screen
                name={Constant.nameScreen.Home}
                component={Home}
            />
            <Tab.Screen
                name={Constant.nameScreen.NotificationList}
                component={NotificationList}
                options={{
                    title: 'Thông báo',
                    tabBarBadge: count
                }}
                listeners={{
                    tabPress: (e) => {
                        dispatch(resetCount())
                    },
                }}
            />
            <Tab.Screen
                name={Constant.nameScreen.Scan}
                component={Scan2}
            />
            <Tab.Screen
                name={Constant.nameScreen.Profile}
                component={Profile}
            />
        </Tab.Navigator>
    )
}

export default TabBarNavigation

const styles = StyleSheet.create({})
