import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useRoute, useNavigation, StackActions } from '@react-navigation/native'
import Constant from '../../controller/Constant'
import EquipmentItem from './components/EquipmentItem'

const EquipmentErrorResult = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const equipments = route.params?.newEquipments;

  const requestError = (id, title, model, serial) => {
    navigation.dispatch(
        StackActions.push(Constant.nameScreen.ErrorInfoInput, { id, title, model, serial })
    )
}

const renderItem = ({ item }) => {
    return (
        <EquipmentItem 
            item={item} 
            key={item.id}
            onPress={() => requestError(item?.id, item?.title, item?.model, item?.serial)} 
        />
    )
}

  return (
    equipments.length === 0 ? 
    <View/> :
    <View style={{ flex: 1}}>
            <Text 
                style={[
                    styles.title,
                    {
                        marginBottom: 10
                    }
                ]}
            >
                Chọn thiết bị cần báo hỏng
            </Text>
            <FlatList
                data={equipments}
                renderItem={renderItem}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{
                    paddingTop: 12
                }}
            />
        </View>
  )
}

export default EquipmentErrorResult

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    color: Constant.color.text
},
})