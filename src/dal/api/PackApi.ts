import { type } from 'os';
import { CardPacksType, instance, ResponsePackType } from './authApi';

export const packApi = {
    getPacks(page: number, pageCount: number, sortPacks: string = '0updated', searchValue: string) {
        return instance.get<ResponsePackType>(`cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=${sortPacks}&packName=${searchValue}`)
    },
    getMyPacks(page: number, pageCount: number, sortPacks: string = '0updated', user_id?: string) {
        return instance.get<ResponsePackType>(`cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=${sortPacks}&user_id=${user_id}`)
    },
    addPack() {
        return instance.post<AddPackType>('cards/pack', {
            cardsPack: {
                name: 'So name',
                private: false
            }
        })
    },
    updatePack(_id: string, name: string) {
        return instance.put<UpdatePackType>('cards/pack', {
            cardsPack: {
                _id: _id,
                name: name
            }
        });
    },
    removePack(id: string) {
        return instance.delete<RemovePackType>(`cards/pack?id=$`);
    },
}

type AddPackType = {
    newCardsPack: CardPacksType
}

type UpdatePackType = {
    updatedCardsPack: CardPacksType
}

type RemovePackType = {
    deletedCardsPack: CardPacksType
}