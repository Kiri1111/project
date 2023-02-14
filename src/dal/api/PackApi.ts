import { CardPacksType, instance, ResponsePackType } from './CardsApi';

export const packApi = {
    getPacks(page: number, pageCount: number, sortPacks: string = '0updated') {
        return instance.get<ResponsePackType>(`cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=${sortPacks}`)
    },
    addPack() {
        return instance.post<CardPacksType>('cards/pack', {
            params: {
                name: 'No name',
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
    removePack(id:  string) {
        return instance.delete<CardPacksType>(`cards/pack?id=${id}`);
    },
}