import React, {useCallback, useState, ChangeEvent} from 'react';
import TemplateModal from '../../../common/components/templateModal/TemplateModal';
import Checkbox from '../../../common/components/commonCheckbox/Checkbox';
import {FormControl, FormControlLabel, FormLabel, TextField, Typography, Stack} from '@mui/material';
import Button from '../../../common/components/commonButton/Button'
import {useAppDispatch} from "../../../../hooks/redux";
import {setMyPackTC, setPackTC} from "../../../../bll/reducers/packList";
import label from '../../../common/assets/images/noImageAavailable.svg.png'
import {ChangeAvatar} from "../../../common/components/changeImage/ChangeAvatar";

type AddEditPackListType = {
    text?: string
    openModal: boolean
    setOpenModal: (value: boolean) => void
    myOrAllCards: string
}

const AddEditPackList: React.FC<AddEditPackListType> = ({myOrAllCards, openModal, setOpenModal, text}) => {

    const dispatch = useAppDispatch()

    const [checked, setChecked] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const handleClose = useCallback(() => setOpenModal(false), []);
    const checkedCallBack = useCallback((check: boolean) => setChecked(check), []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSave = (base64?: string | ArrayBuffer | null) => {
        handleClose();
        if (myOrAllCards === 'all') {
            if (base64) {
                dispatch(setPackTC(inputValue, base64))
            } else {
                dispatch(setPackTC(inputValue))
            }
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

                    <ChangeAvatar callBack={handleSave}/>

                </div>

                <img
                    style={{padding: '20px', width: '120px', height: '120px', paddingRight: '20px'}}
                    alt={'icon label'}
                    src={label}
                />
                <FormLabel>Name pack</FormLabel>
                <TextField
                    type='text'
                    margin="normal"
                    value={inputValue}
                    onChange={handleChange}
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