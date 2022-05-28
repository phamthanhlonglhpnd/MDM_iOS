import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, Platform } from 'react-native'
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function EmployeeItem({ item }) {
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

  return (
    <View style={styles.user}>
        <Image
            style={styles.avatar}
            source={{
                uri: item?.profile_photo_url
            }}
        />                    
        <View style={styles.info}>
            <View style={styles.infoItem}>
                <FontAwesome5 name='user' size={18} color='black'/>
                <Text style={styles.text}>{item?.displayname}</Text>
            </View>                    
            <View style={styles.infoItem}>
                <FontAwesome5 name='envelope' size={18} color='black'/>
                <TouchableOpacity
                    onPress={() => sendEmail(item?.email)}
                >
                    <Text style={styles.text}>{item?.email}</Text>
                </TouchableOpacity>
            </View>                    
            <View style={styles.infoItem}>
                <FontAwesome5 name='phone' size={18} color='black'/>
                <TouchableOpacity
                    onPress={() => makePhoneCall(item?.phone)}
                >
                    <Text style={styles.text}>{item?.phone}</Text>
                </TouchableOpacity>
            </View>                        
        </View>                   
    </View>                            
        
  );
}

const styles = StyleSheet.create({
    user: {
        flexDirection:'row',
        paddingVertical: 10,
        backgroundColor: '#F9F6FD',
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 15,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#A7676C'
    },
    info: {
        flex: 1
    },
    infoItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        marginLeft: 10,
        color:'black'
    }
})
