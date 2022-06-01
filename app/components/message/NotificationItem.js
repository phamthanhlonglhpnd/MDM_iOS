import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constant from '../../controller/Constant'
import dayjs from 'dayjs'


const NotificationItem = ({ item }) => {

    return (
        <View style={styles.contentView}>
            <Text style={styles.text}>
                {`Thời gian: ${dayjs(item?.created_at).format('DD/MM/YYYY')}`}
            </Text>
            <Text style={styles.text}>
                {`Nội dung: ${item.data?.content}`}
            </Text>
            <Text style={styles.text}>
                {`Người gửi: Admin`}
            </Text>
        </View>
    )
}

export default NotificationItem

const styles = StyleSheet.create({
    contentView: {
        backgroundColor: 'white',
        marginHorizontal: 12,
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
    },
    text: {
        color: Constant.color.text,
        marginBottom: 5
    }
})
