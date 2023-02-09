import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/'
    withCredentials: true,
})

export const cardsApi = {
    me() {
        return instance.post<ResponseType>('auth/me')
    },
    login() {
        return instance.post<ResponseType>('auth/login', {
            // email: "92_medved@mail.ru",
            // password: "me290815",
            // rememberMe: true
        })
    },
    register(email: string, password: string) {
        return instance.post<ResponseType>('auth/register', {
            email: email,
            password: password
        });
    },
    logOut() {
        return instance.delete('auth/me')
    },
    changeNewName(newName: string) {
        return instance.put('auth/me', {name: newName})
    },
    changeNewAvatar(newAvatar: string) {
        return instance.put('auth/me', {avatar: newAvatar})
    }
}


//------------------types-----------------------


export type ResponseType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date
    updated: Date
    avatar?: string | null
    __v: number
    token: string
    tokenDeathTime: number
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
}
