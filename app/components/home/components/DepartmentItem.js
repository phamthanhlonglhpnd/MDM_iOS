import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Constant from '../../../controller/Constant';
import { useNavigation, StackActions } from '@react-navigation/native';

export default function DepartmentItem({ item }) {
    const navigation = useNavigation();

    const makePhoneCall = (number) => {
        let phoneNumber = '';
        if(Platform.OS==='android') {
            phoneNumber = `tel:${number}`
        } else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber)
    }

    const sendEmail = (email) => {
        Linking.openURL(`mailto: ${email}`);
    }

    const showEquipmentList = (id, title) => {
        navigation.dispatch(
            StackActions.push(Constant.nameScreen.Equipment_Department, { id, title })
        )
    }

  return (
    <View style={styles.user}>
                    <View style={styles.infoItem}>
                        <Text style={styles.name}>{item?.title}</Text>
                    </View>
                    <View style={styles.itemFirst}>
                        <View style={styles.infoItem}>
                                <TouchableOpacity
                                    onPress={() => sendEmail(item?.email)}
                                    style={styles.email}
                                >
                                    <View style={styles.icon}>
                                        <FontAwesome5 name='envelope' size={18} color='white'/>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text}>{item?.email}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <TouchableOpacity
                                onPress={() => makePhoneCall(item?.phone)}
                                style={styles.phone}
                            >
                                <View style={styles.icon}>
                                    <FontAwesome5 name='phone' size={18} color='white'/>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.text}>{item?.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.itemSecond}>
                        <View style={styles.infoItem}>
                            <TouchableOpacity 
                                // onPress={() => showEquipmentList(item.id, item.title)}
                                style={styles.map}
                            >
                                <View style={styles.icon}>
                                    <FontAwesome5 name='location-arrow' size={18} color='white'/>
                                </View>
                                
                            </TouchableOpacity>
                            
                            <Text style={styles.text}>{item?.address}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <TouchableOpacity 
                                onPress={() => showEquipmentList(item.id, item.title)}
                                style={styles.list}
                            >
                                <View style={styles.icon}>
                                    <FontAwesome5 name='list' size={18} color='white'/>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.text}>Danh sách thiết bị</Text>
                        </View>
                    </View>             
    </View>
  );
}

const styles = StyleSheet.create({
    user: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 15
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
        alignSelf: 'center'
    },
    itemFirst: {
        backgroundColor: '#DDFFFC',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    itemSecond: {
        backgroundColor: '#FFEDEE',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        color: Constant.color.text
    },
    name: {
        fontSize: 17,
        color: 'black',
        fontWeight:'bold'
    },
    email: {
        backgroundColor: '#EC8C3D',
        width: 50,
        height: 50,
        borderRadius: 50,
    }, 
    icon: {
        marginTop: 15,
        marginLeft: 15,
    },
    phone: {
        backgroundColor: '#EC8C3D',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    map: {
        backgroundColor: '#EC8C3D',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    list: {
        backgroundColor: '#EC8C3D',
        width: 50,
        height: 50,
        borderRadius: 50,
    }
})


