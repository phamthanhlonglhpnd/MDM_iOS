import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList, LogBox } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import backgroundOnBoarding from '../../assets/images/backgroundOnBoarding.png';
import FormInput from '../customs/FormInput';
import loginBackGround from '../../assets/images/img_logo.png';
import StorageManager from '../../controller/StorageManager';
import Constant from '../../controller/Constant';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { validateDomain } from '../../controller/validate';

export default function OnBoarding({ navigation }) {
    const [domain, setDomain] = useState('');
    const [domainError, setDomainError] = useState('');
    const [isShowDomains, setIsShowDomains] = useState(false);
    const isValidate = domain !== '' && domainError === '';

    const gotoLogin = async () => {
        navigation.navigate(Constant.nameScreen.Login);
        await StorageManager.setData(Constant.keys.domain, domain);
        setDomain('');
        setIsShowDomains(false);
    }

    const fillDomain = (domain) => {
        validateDomain(domain, setDomainError);
        setDomain(domain);
        setIsShowDomains(true);
    }

    const selectDomain = (domain) => {
        setDomain(domain);
        setIsShowDomains(false);
    }

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.domain}
                onPress={() => selectDomain(item?.value)}
            >
                <Text>{item?.value}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <KeyboardAwareScrollView style={styles.container}>
            <ImageBackground
                source={backgroundOnBoarding}
                style={styles.backgroundOnBoarding}
            />
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={loginBackGround}
                />
                <View style={{ marginTop: 60}}>
                    <Text style={styles.title}>Quản lý thiết bị và vật tư y tế</Text>
                </View>
                <View style={{ marginTop: 30}}>
                    <Text style={[styles.text, { color: 'black'}]}>Nhập địa chỉ trang web của bệnh viện</Text>
                    <FormInput
                        value={domain}
                        onChangeText={(domain) => fillDomain(domain)}
                        onBlur={() => {
                            setDomainError("")
                        }}
                        onFocus={() => setIsShowDomains(true)}
                        appendComponent={
                            <View style={{ justifyContent: 'center', marginLeft: -40,}}>
                                <FontAwesome5
                                  name={domainError==="" ? 'check-circle': 'times-circle'}
                                  size={20}
                                  color={domainError==="" ? 'green' : 'red'}
                                />
                            </View>
                        }
                    />
                </View>
                {
                    isShowDomains ?
                    <View style={styles.domains}>
                        <FlatList
                            data={Constant.domains}
                            renderItem={renderItem}
                            keyExtractor={(item) => item?.id}
                        />
                    </View> : <View/>
                }
            </View>
            <TouchableOpacity
                style={[
                    styles.button, 
                    {
                      backgroundColor: isValidate ? '#FF6C44' : 'rgba(227, 120, 75, 0.4)'
                    }
                  ]}
                onPress={() => gotoLogin()}
                disabled={!isValidate}
            >
                <Text style={styles.text}>Bắt đầu</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    backgroundOnBoarding: {
        height: 500,
        width: "100%",
        position: 'absolute',
        top: -180
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    hospitalLogo: {
        height: 60, 
        width: 60,
        borderRadius: 20,
        marginRight: 20
    },
    introApp: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center',
        marginTop: 20
    }, 
    nameApp: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FF6C44'
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 65
    },
    button: {
        backgroundColor: '#FF6C44',
        height: 50,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 20,
        paddingVertical: 12
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        // fontWeight: 'bold',
    }, 
    title: {
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    domains: {
        height: 90,
        backgroundColor: '#DDDDDD',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    domain: {
        marginBottom: 10
    }
})
