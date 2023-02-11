import React, {useEffect} from 'react';
import {setCardsPacksTC} from "../../../bll/reducers/packList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Preloader} from "../../common/components/preloader/Preloader";

export const PackList = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const packs = useAppSelector(state => state.packList)

    useEffect(() => {
        dispatch(setCardsPacksTC())
    }, [])

    if (status === 'loading') {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Preloader width={'300px'}/>
        </div>
    }

    return (
        <div>
            <h3>Pack list</h3>
            {packs.cardPacks.map(el => {
                return (
                    <span>{el.name}</span>
                )
            })}
        </div>
    )
}

