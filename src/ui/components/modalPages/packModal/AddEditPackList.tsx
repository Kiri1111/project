import React, {useCallback, useState, ChangeEvent} from 'react';
import TemplateModal from '../../../common/components/templateModal/TemplateModal';
import Checkbox from '../../../common/components/commonCheckbox/Checkbox';
import {FormControl, FormControlLabel, FormLabel, TextField, Typography, Stack} from '@mui/material';
import Button from '../../../common/components/commonButton/Button'
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {setDeckCoverAC, setMyPackTC, setPackTC} from "../../../../bll/reducers/packList";
import {InputTypeFile} from "../../../common/components/inputTypeFile/InputFile";

type AddEditPackListType = {
    text?: string
    openModal: boolean
    setOpenModal: (value: boolean) => void
    myOrAllCards: string
}

const AddEditPackList: React.FC<AddEditPackListType> = ({myOrAllCards, openModal, setOpenModal, text}) => {

    const dispatch = useAppDispatch()
    const uploadCover = useAppSelector(state => state.packList.deckCover)

    const [checked, setChecked] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const handleClose = useCallback(() => setOpenModal(false), []);
    const checkedCallBack = useCallback((check: boolean) => setChecked(check), []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const setImageBase64 = (base64: string) => {
        dispatch(setDeckCoverAC(base64))
    }

    const handleSave = () => {
        handleClose();
        if (myOrAllCards === 'all') {
            dispatch(setPackTC(inputValue))
        } else {
            dispatch(setMyPackTC(inputValue))
        }
    }


    return (
        <TemplateModal open={openModal} handleClose={handleClose}>
            <FormControl>
                <Typography variant="h5">{text}</Typography>
                <hr style={{width: '100%'}}/>
                <div>
                    <span>Cover</span>
                    <InputTypeFile callBack={setImageBase64}/>
                </div>

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
                    placeholder={'Maximum 15 characters'}
                />
                <FormControlLabel label={'Private pack'} control={<Checkbox
                    checked={checked} onChangeChecked={checkedCallBack}
                />}/>
                <Stack direction="row" spacing={12}>
                    <Button title='cancel' onClickCallBack={handleClose}/>
                    <Button title='save' onClickCallBack={handleSave}/>
                </Stack>
            </FormControl>
        </TemplateModal>
    )
}


export default AddEditPackList;