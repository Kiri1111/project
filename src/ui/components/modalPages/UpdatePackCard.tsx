import {FormLabel, Stack, TextField, Typography} from '@mui/material'
import React, {ChangeEvent, useCallback, useState} from 'react'
import Button from '../../common/components/commonButton/Button'
import TemplateModal from '../../common/components/templateModal/TemplateModal'
import {CardPacksType} from "../../../dal/api/authApi";
import {InputTypeFile} from "../../common/components/inputTypeFile/InputFile";
import {setDeckCoverAC} from "../../../bll/reducers/packList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";


type UpdatePackType = {
    list?: CardPacksType
    openModal: boolean
    setOpenModal: (value: boolean) => void
    updateCallBack: (listId: string, title: string) => void
}

export const UpdatePackCard: React.FC<UpdatePackType> = ({updateCallBack, openModal, list, setOpenModal}) => {

    const dispatch = useAppDispatch()
    const uploadCover = useAppSelector(state => state.packList.deckCover)

    const [inputValue, setInputValue] = useState('');


    const handleClose = useCallback(() => setOpenModal(false), []);

    const handleUpdate = () => {
        handleClose();
        if (list) {
            updateCallBack(list._id, inputValue)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const setImageBase64 = (base64: string) => {
        dispatch(setDeckCoverAC(base64))
    }

    return (
        <div>
            <TemplateModal open={openModal} handleClose={handleClose}>
                <Typography variant="h5">Update pack</Typography>
                <InputTypeFile callBack={setImageBase64}/>
                <img
                    style={{padding: '20px', width: '120px', height: '120px', paddingRight: '20px'}}
                    alt={'icon label'}
                    src={uploadCover}
                />
                <FormLabel>Name pack</FormLabel>
                <TextField
                    type='text'
                    margin="normal"
                    value={inputValue}
                    onChange={handleChange}
                />
                <Stack direction="row" spacing={12}>
                    <Button title='Cancel' onClickCallBack={handleClose}/>
                    <Button title='Update' onClickCallBack={handleUpdate}/>
                </Stack>
            </TemplateModal>
        </div>
    )
}