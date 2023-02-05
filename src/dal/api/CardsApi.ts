import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/'
    // baseURL: 'https://neko-back.herokuapp.com/2.0'
})

export const cardsApi = {
    me() {
        return instance.post('/auth/me')
    }
}


//------------------types-----------------------

export type ResponseType = {}