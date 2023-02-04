import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/'
})

export const cardsApi = {
    me() {
        return instance.get('*****')
    }
}


//------------------types-----------------------

export type ResponseType = {}