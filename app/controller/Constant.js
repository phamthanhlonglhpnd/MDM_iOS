import { Dimensions } from 'react-native'

export default {
    baseURL: "http://bv.qltbyt.com/api/v1",
    imageBaseURL: 'http://bv.qltbyt.com/uploads',
    onesignalKey: "",
    color: {
        main: '#2A238E',
        mainBG: '#ffd9f9',
        second: '#42c997',
        mainDisable: '#ed8e8e',
        background: '#f5f5f5',
        text: '#2E2D31',
        default: 'gray',
        tabbarInactive: 'gray',
        searchBG: '#e0e0e0',
        shadow: '#adacac',
        bgMain: '#b3d0ff',
        separator: '#ededed', //'#b5b5b5'
        bgImage: '#dedede',
        description: '#A8A8A8',
        gray: '#4d4d4d',
        bgRating: '#ebebeb',
        empty: '#747474',
        placeholderText: '#a9a9a9',
        border: '#c5c5c5',
        alertRed: '#fc3d03',
        heart_inactive: '#D8D8D8',
        heart_active: '#FF5A99',
        bgColor: '#F5F7F9',
        purple: '#B297FC',
        blue: '#0091FF',
        green: '#20D0A1',
        error: '#FF0000',
    },
    errorMsg: {
        common: 'Đã có lỗi xảy ra. Vui lòng thử lại!',
    },
    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    nameScreen: {
        TabBar: 'TabBar',
        Home: 'Trang chủ',
        Profile: 'Cá nhân',
        Settings: 'Settings',
        Message: 'Message',
        Login: 'Login',
        OnBoarding: "OnBoarding",
        EquipmentList: 'EquipmentList',
        StaffList: 'StaffList',
        EquipmentDetails: 'EquipmentDetails',
        DepartmentList: 'DepartmentList',
        ErrorRequest: 'ErrorRequest',
        ImageScanner: 'ImageScanner',
        ScannerContainer: 'ScannerContainer',
        ErrorInfoInput: 'ErrorInfoInput',
        EquipmentInventory: 'EquipmentInventory',
        SuppliesList: 'SuppliesList',
        EquipmentInventoryInput: 'EquipmentInventoryInput',
        NotificationList: 'NotificationList',
        Scan: 'Scan',
        Equipment_Department: 'Danh sách thiết bị',

    },
    dateFormat: {
        default: 'dd-MM-yyyy',
        calendar: 'yyyy-MM-dd',
        dateTime: 'dd-MM-yyyy HH:mm',
        timeDate: 'HH:mm dd-MM-yyyy',
        hourMinute: 'HH:mm',
        dayOfWeek: 'EEEE, dd-MM-yyyy',
        full: 'HH:mm:ss dd-MM-yyyy',
        voucher: 'yyyy-MM-dd HH:mm:ss'
    },
    keys: {
        isOpened: 'isOpened',
        currentUser: 'currentUser',
        count: 'count',
        department: 'department',
        domain: 'domain'
    },
    homeData: [
        {
            title: 'Thiết bị',
            icon: require('../assets/images/ic_medical_equipment.png'),
            color: '#DBA426',
            screen: 'EquipmentList'
        },
        {
            title: 'Khoa phòng',
            icon: require('../assets/images/ic_organization.png'),
            color: 'orange',
            screen: 'DepartmentList'
        },
        {
            title: 'Nhân viên',
            icon: require('../assets/images/ic_employees.png'),
            color: '#81A9B2',
            screen: 'StaffList'
        },
        {
            title: 'Vật tư',
            icon: require('../assets/images/ic_supplies.png'),
            color: '#D3C3C3',
            screen: 'SuppliesList'
        },
        {
            title: 'Báo hỏng',
            icon: require('../assets/images/ic_notification.png'),
            color: '#A3280B',
            screen: 'ErrorRequest'
        },
        {
            title: 'Kiểm kê',
            icon: require('../assets/images/ic_statistics.png'),
            color: '#A86362',
            screen: 'EquipmentInventory'
        }
    ],
    staffData: [
        {
            name: 'Nguyễn Văn A',
            phone: '0394827622',
            email: 'aaaaaa@gmail.com',
            type: 'Admin'
        },
        {
            name: 'Phạm B',
            phone: '039482888',
            email: 'nnnnn@gmail.com',
            type: 'Tester'
        },
        {
            name: 'Lê Công C',
            phone: '099999999',
            email: 'iiiiiiii@gmail.com',
            type: 'Admin'
        },
        {
            name: 'Nguyễn Ngọc D',
            phone: '0888888888',
            email: 'eeeeeeee@gmail.com',
            type: 'NVKP'
        },
        {
            name: 'Trần Ánh E',
            phone: '0777777777',
            email: 'uuuuuuuuu@gmail.com',
            type: 'Doctor'
        },
        {
            name: 'Cao Thị G',
            phone: '0555555555',
            email: 'wwwwww@gmail.com',
            type: 'Nurse'
        }
    ],
    equipmentStatus: [
        {
            key: 'not_handed',
            value: 'Mới'
        },
        {
            key: 'active',
            value: 'Đang sử dụng'
        },
        {
            key: 'was_broken',
            value: 'Đang báo hỏng'
        },
        {
            key: 'corrected',
            value: 'Đang sửa chữa'
        },
        {
            key: 'inactive',
            value: 'Ngừng sử dụng'
        },
        {
            key: 'liquidated',
            value: 'Đã thanh lý'
        }
    ],
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    // domains: [
    //     "http://bv.qltbyt.com",
    //     "http://bvkienanhp.qltbyt.com",
    //     "http://bvdemo.qltbyt.com",
    //     "http://bvcuchi.qltbyt.com",
    //     "http://bme.qltbyt.com",
    //     "http://bvnhihp.qltbyt.com",
    //     "http://bvdakhoatinhthaibinh.qltbyt.com",
    //     "http://bvungbuou.qltbyt.com",
    // ]
    domains: [
        {
            id: 1,
            value: "http://bv.qltbyt.com",
            img: ""
        },
        {
            id: 2,
            value: "http://bvkienanhp.qltbyt.com",
            img: ""
        },
        {
            id: 3,
            value: "http://bvdemo.qltbyt.com",
            img: ""
        },
        {
            id: 4,
            value: "http://bvcuchi.qltbyt.com",
            img: ""
        },
        {
            id: 5,
            value: "http://bme.qltbyt.com",
            img: ""
        },
        {
            id: 6,
            value: "http://bvnhihp.qltbyt.com",
            img: ""
        },
        {
            id: 7,
            value: "http://bvdakhoatinhthaibinh.qltbyt.com",
            img: ""
        },
        {
            id: 8,
            value: "http://bvungbuou.qltbyt.com",
            img: ""
        }
    ]
}

