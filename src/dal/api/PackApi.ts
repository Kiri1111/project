import { CardPacksType, instance, ResponsePackType } from './authApi';

export const packApi = {
    getPacks(page: number, pageCount: number, sortPacks: string = '0updated', searchValue: string) {
        return instance.get<ResponsePackType>(`cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=${sortPacks}&packName=${searchValue}`)
    },
    getMyPacks(page: number, pageCount: number, sortPacks: string = '0updated', user_id?: string) {
        return instance.get<ResponsePackType>(`cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=${sortPacks}&user_id=${user_id}`)
    },
    addPack() {
        return instance.post<PackType>('cards/pack', {
            cardsPack: {
                name: 'So name',
                private: false
            }
        })
    },
    updatePack(_id: string, name: string) {
        return instance.put<CardPacksType>('cards/pack', {
            params: {
                _id,
                name
            }
        });
    },
    removePack(id: string) {
        return instance.delete<CardPacksType>(`cards/pack?id=$`);
    },
}

type PackType = {
    newCardsPack: CardPacksType
}