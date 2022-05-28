import axios from 'axios'
import AppManager from "./AppManager"
import UserModel from "../model/UserModel"
import Constant from './Constant'
import StorageManager from './StorageManager'
import { format } from 'date-fns'

export default class APIManager {

    static baseURL = Constant.baseURL

    static endpoints = {
        login: 'http://bv.qltbyt.com/api/login',
        getAllUsers: APIManager.baseURL + '/users',
        getAllEquipments: APIManager.baseURL + '/equipments',
        getAEquipment: APIManager.baseURL + '/equipments',
        getAllDepartments: APIManager.baseURL + '/departments',
        requestError: APIManager.baseURL + '/equipment',
        getAllSupplies: APIManager.baseURL + '/equipments',
        getAllEquipmentsByDepartment: APIManager.baseURL + '/listEquipmentInventory',
        requestInventory: APIManager.baseURL + '/createInventory',
        getInventoryByEquipmentID: APIManager.baseURL + '/listInventoryByEquipmentID',
        getAllNotification: APIManager.baseURL + '/notification',

    }

    static headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    static async login(email, password) {
        try {
            const data = {
                email,
                password
            }
            let response = await axios.post(APIManager.endpoints.login, data, { headers: APIManager.headers })
            if (response.data?.status_code === 200) {
                let user = new UserModel(response.data?.data)
                user.access_token = response.data?.access_token
                AppManager.shared.currentUser = user
                await StorageManager.setData(Constant.keys.currentUser, user.toDictionary())
                return Promise.resolve(response.data?.data)
            }
            return Promise.reject(new Error('Đã có lỗi xảy ra!'))
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getAllUser() {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            let response = await axios.get(APIManager.endpoints.getAllUsers, { headers })
            const users = Object(response.data?.data ?? [])
            return Promise.resolve(users)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getAllEquipments(keyword) {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            let response = await axios.get(`${APIManager.endpoints.getAllEquipments}?keyword=${keyword}`, { headers })
            const equipments = Object(response.data?.data ?? [])
            return Promise.resolve(equipments)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getAllSupplies() {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            let response = await axios.get(APIManager.endpoints.getAllSupplies, { headers })
            const supplies = Object(response.data?.data ?? [])
            return Promise.resolve(supplies)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getAEquipment(id) {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            const url = `${APIManager.endpoints.getAEquipment}/${id}`
            let response = await axios.get(url, { headers })
            return Promise.resolve(response.data?.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getAllDepartments() {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            let response = await axios.get(APIManager.endpoints.getAllDepartments, { headers })
            const departments = Object(response.data?.data ?? [])
            return Promise.resolve(departments)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getAllEquipmentsByDepartment(id) {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            let response = await axios.get(`${APIManager.endpoints.getAllEquipmentsByDepartment}/${id}`, { headers })
            const equipments = Object(response.data?.data ?? [])
            return Promise.resolve(equipments)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async requestError(id, reason) {
        try {
            const date_failure = format(new Date(), 'hh:mm dd-MM-yyyy')
            const info = {
                date_failure,
                reason
            }
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            const url = `${APIManager.endpoints.requestError}/${id}`
            let response = await axios.post(url, info, { headers });
            let dataRequset = {
                data: response.data,
                id,
                info
            }
            return Promise.resolve(dataRequset)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async requestInventory(id, note) {
        try {
            const date = format(new Date(), 'yyyy-MM-dd')
            const info = {
                date,
                note
            }

            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            const url = `${APIManager.endpoints.requestInventory}/${id}`
            let response = await axios.post(url, info, { headers });
            
            let dataRequset = {
                data: response.data,
                id,
                info
            }
            return Promise.resolve(dataRequset)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getInventoryByEquipmentID(id) {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            const url = `${APIManager.endpoints.getInventoryByEquipmentID}/${id}`
            let response = await axios.get(url, { headers })
            return Promise.resolve(response.data?.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async getAllNotification() {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            const url = APIManager.endpoints.getAllNotification;
            let response = await axios.get(url, { headers })
            return Promise.resolve(response.data?.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}


