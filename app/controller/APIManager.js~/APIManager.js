import axios from 'axios'
import AppManager from "./AppManager"
import UserModel from "../model/UserModel"
import Constant from './Constant'
import StorageManager from './StorageManager'

export default class APIManager {

    static baseURL = Constant.baseURL

    static endpoints = {
        login: APIManager.baseURL + '/login',
        getAllUsers: APIManager.baseURL + '/users',
        getAllEquipments: APIManager.baseURL + '/equipments',
        getAEquipment: APIManager.baseURL + '/equipments',
        getAllDepartments: APIManager.baseURL + '/departments'
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

    static async getAllEquipments() {
        try {
            const headers = {
                ...APIManager.headers,
                Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
            }
            let response = await axios.get(APIManager.endpoints.getAllEquipments, { headers })
            const equipments = Object(response.data?.data ?? [])
            return Promise.resolve(equipments)
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
}

