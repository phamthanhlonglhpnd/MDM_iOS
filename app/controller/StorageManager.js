import AsyncStorage from '@react-native-async-storage/async-storage'

export default class StorageManager {
    static setData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            alert(error)
        }
    }

    static getData = async (key) => {
        try {
            let data = await AsyncStorage.getItem(key)
            return JSON.parse(data)
        } catch (error) {
            return null
        }
    }
}
