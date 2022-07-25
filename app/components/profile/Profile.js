import { useNavigation, StackActions } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import AppManager from '../../controller/AppManager'
import Constant from '../../controller/Constant'
import StorageManager from '../../controller/StorageManager'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../customs/Loading'
import { getAllDepartmentsAPI } from '../../controller/APIService'

const Profile = () => {
    const [department, setDepartment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const userInfo = AppManager.shared.currentUser;

    const getAllDepartments = async () => {
        try {
            let domain = await StorageManager.getData(Constant.keys.domain);
            let response = await getAllDepartmentsAPI(domain);
            setDepartment(response[0].title);
            setIsLoading(false);
        } catch (error) {
            Alert.alert('Thông báo', error?.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllDepartments();
        return () => {

        }
    }, [])

    const logOut = async () => {
        AppManager.shared.currentUser = null
        await StorageManager.setData(Constant.keys.currentUser, null)
        navigation.dispatch(
            StackActions.replace(Constant.nameScreen.Login)
        )
    }

    return (
        isLoading ? <Loading /> :
            <KeyboardAwareScrollView
                style={styles.container}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: userInfo?.profile_photo_url
                    }}
                />
                <View style={styles.middle}>
                    <View style={styles.middleComponent}>
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }}>
                            Họ tên
                        </Text>
                        <Text style={styles.infor}>
                            {userInfo?.displayname}
                        </Text>
                    </View>
                    <View style={styles.middleComponent}>
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }}>
                            Số điện thoại
                        </Text>
                        <Text style={styles.infor}>
                            {userInfo?.phone}
                        </Text>
                    </View>
                    <View style={styles.middleComponent}>
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }}>
                            Khoa/Phòng
                        </Text>
                        <Text style={styles.infor}>
                            {department}
                        </Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <View style={styles.middleComponent}>
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }}>
                            Ngày sinh
                        </Text>
                        <Text style={styles.infor}>
                            {userInfo?.birthday}
                        </Text>
                    </View>
                    <View style={styles.middleComponent}>
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }}>
                            Giới tính
                        </Text>
                        <Text style={styles.infor}>
                            {userInfo?.gender}
                        </Text>
                    </View>
                    <View style={styles.middleComponent}>
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }}>
                            Email
                        </Text>
                        <Text style={styles.infor}>
                            {userInfo?.email}
                        </Text>
                    </View>
                    <View style={styles.middleComponent}>
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }}>
                            Địa chỉ
                        </Text>
                        <Text style={styles.infor}>
                            {userInfo?.address}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={logOut}
                    style={styles.logout}
                >
                    <FontAwesome5
                        name='sign-out-alt'
                        size={25}
                        color='#FF6C44'
                    />
                    <Text style={{ fontSize: 14, marginLeft: 10, color: 'gray' }}>Đăng xuất</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    middle: {
        backgroundColor: "#DDDDDD",
        marginVertical: 15,
        borderRadius: 20,
        paddingHorizontal: 20
    },
    middleComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    image: {
        height: 65,
        width: 65,
        borderRadius: 50,
        marginVertical: 15,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#FF6C44'
    },
    button: {
        borderWidth: 1,
        backgroundColor: 'white',
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    icon: {
        marginTop: 3,
        marginLeft: 5
    },
    infor: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FF6C44'
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    }
})
