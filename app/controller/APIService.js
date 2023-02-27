import axios from 'axios'
import AppManager from "./AppManager"
import StorageManager from './StorageManager'
import Constant from './Constant'
import UserModel from "../model/UserModel"
import { format } from 'date-fns'

const loginAPI = async (email, password, domain) => {
  try {
      const data = { email, password }
      const url = `${domain}/api/login`
      let response = await axios.post(url, data, { headers: Constant.headers })
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

const getAllUsersAPI = async (domain) => {
  try {
      const url = `${domain}/api/v1/users`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      const users = Object(response.data?.data ?? [])
      return Promise.resolve(response.data?.data)
  } catch (error) {
      return Promise.reject(error)
  }
}

const getAllEquipmentsAPI = async (domain, keyword) => {
  try {
      const url = `${domain}/api/v1/equipments?keyword=${keyword}`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      const equipments = Object(response.data?.data ?? [])
      return Promise.resolve(equipments)
  } catch (error) {
      return Promise.reject(error)
  }
}

const getAllSuppliesAPI = async (domain) => {
  try {
      const url = `${domain}/api/v1/equipments`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      const supplies = Object(response.data?.data ?? [])
      return Promise.resolve(supplies)
  } catch (error) {
      return Promise.reject(error)
  }
}

const getAEquipmentAPI = async (domain, id) => {
  try {
      const url = `${domain}/api/v1/equipments/${id}`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      return Promise.resolve(response.data?.data)
  } catch (error) {
      return Promise.reject(error)
  }
}

const getAllDepartmentsAPI = async (domain) => {
  try {
      const url = `${domain}/api/v1/departments`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      const departments = Object(response.data?.data ?? [])
      return Promise.resolve(departments)
  } catch (error) {
      return Promise.reject(error)
  }
}

const getAllEquipmentsByDepartmentAPI = async (domain, id) => {
  try {
      const url = `${domain}/api/v1/listEquipmentInventory/${id}`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      const equipments = Object(response.data?.data ?? [])
      return Promise.resolve(equipments)
  } catch (error) {
      return Promise.reject(error)
  }
}

const requestErrorAPI = async (domain, id, reason) => {
  try {
      const url = `${domain}/api/v1/equipment/${id}`
      const date_failure = format(new Date(), 'yyyy-MM-dd hh:mm:ss')
      const info = { date_failure, reason }
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
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

const requestInventoryAPI = async (domain, id, note) => {
  try {
      const url = `${domain}/api/v1/createInventory/${id}`
      const date = format(new Date(), 'yyyy-MM-dd hh:mm:ss')
      const info = { date, note }
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
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

const getInventoryByEquipmentIdAPI = async (domain, id) => {
  try {
      const url = `${domain}/api/v1/listInventoryByEquipmentID/${id}`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      return Promise.resolve(response.data?.data)
  } catch (error) {
      return Promise.reject(error)
  }
}

const getAllNotificationAPI = async (domain) => {
  try {
      const url = `${domain}/api/v1/notification`
      const headers = {
          ...Constant.headers,
          Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
      }
      let response = await axios.get(url, { headers })
      return Promise.resolve(response.data?.data)
  } catch (error) {
      return Promise.reject(error)
  }
}

const statisticalEquipment = async (domain, filter, value) => {
    try {
        const url = `${domain}/api/v1/statistical-by-info?${filter}=${value}`
        const headers = {
            ...Constant.headers,
            Authorization: `Bearer ${AppManager.shared.currentUser?.access_token}`
        }
        let response = await axios.get(url, { headers })
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export {
  loginAPI,
  getAllUsersAPI,
  getAllEquipmentsAPI,
  getAEquipmentAPI,
  getAllDepartmentsAPI, 
  getAllSuppliesAPI,
  getAllEquipmentsByDepartmentAPI,
  getInventoryByEquipmentIdAPI,
  getAllNotificationAPI,
  requestErrorAPI,
  requestInventoryAPI,
  statisticalEquipment,

}