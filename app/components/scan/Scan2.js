import React, { useState, Fragment } from 'react'
import { TouchableOpacity, Text, Linking, View, Image, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import qrcode from '../../assets/images/qrcode.png';
import Constant from '../../controller/Constant';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useNavigation, StackActions } from '@react-navigation/native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const Scan2 = () => {

  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isFlashMode, setIsFlashMode] = useState(false);
  const navigation = useNavigation();

  const requestCameraPermission = () => {
    request(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          Alert.alert('Thông báo', "Bạn có thể sử dụng camera trong MDM");
        } else {
          Alert.alert('Thông báo', "Quyền truy cập camera của MDM bị từ chối");
        }
      })
      .catch(error => Alert.alert('Thông báo', error))
  };

  const onSuccess = (e) => {
    const check = e.data.substring(0, 4);
    setResult(e);
    setScan(false);
    setScanResult(true);
    if (check === 'http') {
      Linking.openURL(e.data).catch(err => alert('An error occured', err));
    } else {
      setResult(e);
      setScan(false);
      setScanResult(true);
    }
  }

  const showEquipmentDetails = (equipmentId) => {
    navigation.dispatch(
      StackActions.push(Constant.nameScreen.EquipmentDetails, { equipmentId })
    )

  }

  const activeQR = () => {
    setScan(true);
  }

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  }

  return (
    <KeyboardAwareScrollView style={styles.scrollViewStyle}>
      <Fragment>
        <View style={styles.header}>
          <TouchableOpacity onPress={requestCameraPermission}>
            <Image source={qrcode} style={{ height: 36, width: 36 }}></Image>
          </TouchableOpacity>
          <Text style={styles.textTitle}>Scan QR Code</Text>
        </View>
        {!scan && !scanResult &&
          <View style={styles.cardView} >
            <Text numberOfLines={8} style={styles.descText}>Di chuyển camera {"\n"} đến gần mã QR Code</Text>
            <Image source={qrcode} style={{ margin: 20, height: 200, width: 200 }}></Image>
            <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
              <View style={styles.buttonWrapper}>
                <FontAwesome5 name='camera' size={30} color='#2190FB' />
                <Text style={{ ...styles.buttonTextStyle, color: '#2196f3', marginLeft: 20 }}>Scan QR Code</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        {scanResult &&
          <Fragment>
            <Text style={styles.textTitle1}>Kết quả</Text>
            <View style={scanResult ? styles.scanCardView : styles.cardView}>
              <Text style={{ color: Constant.color.text }}>Type : {result.type}</Text>
              <Text style={{ color: Constant.color.text }}>Equipment's ID : {result.data}</Text>
              <TouchableOpacity onPress={() => showEquipmentDetails(result.data)} style={styles.buttonDetail}>
                <View style={styles.buttonWrapper}>
                  <Text style={{ ...styles.buttonTextStyle, color: '#2196f3', textAlign: 'center' }}>Chi tiết thiết bị</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Text style={{ ...styles.buttonTextStyle, color: '#2196f3', textAlign: 'center' }}>Ấn để tiếp tục scan</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Fragment>
        }
        {scan &&
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={(node) => { scanner = node }}
            flashMode={isFlashMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
            onRead={onSuccess}
            bottomContent={
              <View>
                <TouchableOpacity
                  onPress={() => {
                    scanner.reactivate()
                    setIsFlashMode(!isFlashMode)
                  }}
                  onLongPress={() => setScan(false)}>
                  <Ionicons name={isFlashMode ? 'flash' : 'flash-off'} size={30} color='black' />
                </TouchableOpacity>
              </View>
            }
          />
        }
      </Fragment>
    </KeyboardAwareScrollView>
  )
}

export default Scan2

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    backgroundColor: '#2196f3'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 10,
    width: deviceWidth,
    zIndex: 999
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white'
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'black'
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight - 350,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%',
    backgroundColor: 'white'
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#258ce3',
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 20
  },
  buttonScan2: {
    position: 'relative',
    alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    marginBottom: 20
  },
  descText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
    color: Constant.color.text
  },
  highlight: {
    fontWeight: '700',
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: 'white',
    zIndex: 1
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  bottomContent: {
    width: deviceWidth,
    height: 120,
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: 'white',
    marginTop: 32,
    width: deviceWidth - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44
  },
  buttonTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonDetail: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#258ce3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginVertical: 15
  }
})