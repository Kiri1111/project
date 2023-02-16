import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/'
    withCredentials: true,
})

export const authApi = {
    me() {
        return instance.post<ResponseType>('auth/me')
    },
    login(data: LoginRequestType) {
        return instance.post<ResponseType>('auth/login', data)
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

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
}

export type ResponsePackType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number  //количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number  //выбранная страница
    pageCount: number  //количество элементов на странице
    searchValue: string
    sortPacks: string
}

export type ResponseType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    avatar?: string | null
    __v: number
    token: string
    tokenDeathTime: number
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe?: boolean
}

