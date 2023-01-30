import axios from "axios";

const instance = axios.create({
    baseURL: 'https://*********'
})

export const projectApi = {
    me() {
        return instance.get('*****')
    }
}


//------------------types-----------------------

export type ResponseType = {}