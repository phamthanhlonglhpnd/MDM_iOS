import { useNavigation, StackActions } from '@react-navigation/core';
import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FormInput from '../customs/FormInput';
import { validateEmail, validatePassword } from '../../controller/validate';
import hospitalLogo from '../../assets/images/kienan.jpg';
import Constant from '../../controller/Constant'
import Loading from '../customs/Loading';
import StorageManager from '../../controller/StorageManager';
import { loginAPI } from '../../controller/APIService';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const isValidate = email !== "" && emailError === "" && password !=="" && passwordError === "";

  const showHomeScreen = () => {
    navigation.navigate(Constant.nameScreen.TabBar)
    }

    const onTapLogin = async () => {
      setIsLoading(true)
      try {
        let domain = await StorageManager.getData(Constant.keys.domain)
        await loginAPI(email, password, domain)
        showHomeScreen()
        setIsLoading(false)
      } catch(error) {
        Alert.alert('Thông báo', error?.message)
        setIsLoading(false)
      }
    }

    const goBackOnBoarding = async () => {
      await StorageManager.setData(Constant.keys.domain, null)
      navigation.navigate(Constant.nameScreen.OnBoarding)
    }

  return (
    isLoading ? <Loading /> :
    <KeyboardAwareScrollView style={styles.container}>
      <Image
        source={hospitalLogo}
        resizeMode='cover'
        style={styles.image}
      />
      <Text style={styles.text}>MDM</Text>
      <View style={styles.viewInput}>
        <FormInput
          label='Email'
          value={email}
          error={emailError}
          onChangeText={(email) => {
            validateEmail(email, setEmailError);
            setEmail(email);
          }}
          onBlur={() => {
            if(emailError==="") {
              setEmailError("");
            }
          }}
          onFocus={() => validateEmail(email, setEmailError)}
          appendComponent={
            <View style={{ justifyContent: 'center', marginLeft: -40,}}>
                <FontAwesome5
                  name={emailError==="" ? 'check-circle': 'times-circle'}
                  size={20}
                  color={emailError==="" ? 'green' : 'gray'}
                />
            </View>
          }
        />
        <FormInput
          label='Password'
          value={password}
          error={passwordError}
          secureTextEntry={!isShowPassword}
          onChangeText={(password) => {
            validatePassword(password, setPasswordError);
            setPassword(password)
          }}
          onBlur={() => {
            if(password==="") {
              setPasswordError("");
            }
          }}
          onFocus={() => validatePassword(password, setPasswordError)}
          appendComponent={
            <TouchableOpacity
              style={{
                marginLeft: -45,
                justifyContent: 'center'
              }}
              onPress={() => setIsShowPassword(!isShowPassword)}
            >
              <FontAwesome5
                name={isShowPassword ? 'eye' : 'eye-slash'}
                size={20}
                color='gray'
              />
            </TouchableOpacity>
          }
        />
        
        <TouchableOpacity
          style={[
            styles.login, 
            {
              backgroundColor: isValidate ? '#F7AC65' : 'rgba(227, 120, 75, 0.4)'
            }
          ]}
          onPress={onTapLogin}
          disabled={!isValidate}
        >
          <Text style={styles.loginText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.login, 
            {
              backgroundColor: '#F7AC65'
            }
          ]}
          onPress={goBackOnBoarding}
        >
          <Text style={styles.loginText}>Quay lại màn hình bắt đầu</Text>
        </TouchableOpacity>
      </View> 
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30
  },
  image: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center', 
    marginTop: 40,
    borderWidth: 2,
    borderColor: '#FF6C44'
  },
  text: {
    textAlign: 'center',
    fontSize: 25, 
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 30
  },
  name: {
    flexDirection: 'column',
    marginBottom: 30
  },
  viewInput: {
    flexDirection: 'column',
    marginHorizontal: 30
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30, 
    marginBottom: 30, 
    paddingHorizontal: 20,
    fontSize: 16
  },
  login: {
    borderRadius: 30, 
    marginTop: 30, 
    paddingVertical: 18
  }, 
  loginText: {
    textAlign: 'center', 
    fontSize: 16,
    color: 'white',
  },
  showPassword: {
    position: 'absolute',
    top: 15,
    right: 20
  }
})
