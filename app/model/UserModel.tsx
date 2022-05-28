export default class UserModel {
    access_token: string = ''
    id: number
    name: string = ''
    email: string = ''
    email_verified_at: string = ''
    current_team_id: string = ''
    displayname: string = ''
    image: string = ''
    address: string = ''
    birthday: string = ''
    phone: string = ''
    department_id: number
    gender: string = ''
    is_disabled: number
    created_at: string = ''
    updated_at: string = ''
    profile_photo_url: string = ''

    constructor(dict: any) {
        if (dict === undefined || dict === null) {
            return
        }
        this.id = dict?.id ?? null
        this.name = dict?.name
        this.displayname = dict?.displayname
        this.email = dict?.email
        this.phone = dict?.phone
        this.birthday = dict?.birthday
        this.department_id = dict?.department_id
        this.gender = dict?.gender
        this.address = dict?.address
        this.access_token = dict?.access_token
        this.profile_photo_url = dict?.profile_photo_url
    }

    toDictionary() {
        return {
            access_token: this.access_token,
            id: this.id,
            name: this.name,
            email: this.email,
            displayname: this.displayname,
            address: this.address,
            profile_photo_url: this.profile_photo_url,
            gender: this.gender,
            phone: this.phone,
            birthday: this.birthday,
            department_id: this.department_id
        }
    }
}