import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/'
    withCredentials: true,
})

export const cardsApi = {
    me() {
        return instance.post<AxiosResponse<ResponseType>>('auth/me')
    },
    login(data: LoginRequestType) {
        return instance.post<AxiosResponse<ResponseType>>('auth/login', {data})
    }
}


//------------------types-----------------------

export type ResponseType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    __v: number;
    token: string;
    tokenDeathTime: number;
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
}