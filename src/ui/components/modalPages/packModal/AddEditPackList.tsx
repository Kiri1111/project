import React, { useCallback, useState, ChangeEvent } from 'react';
import TemplateModal from '../../../common/components/templateModal/TemplateModal';
import Checkbox from '../../../common/components/commonCheckbox/Checkbox';
import { FormControl, FormControlLabel, FormLabel, TextField, Typography, Stack } from '@mui/material';
import Button from '../../../common/components/commonButton/Button'


type AddEditPackListType = {
    text?: string
}

const AddEditPackList: React.FC<AddEditPackListType> = ({ text }) => {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    const checkedCallBack = useCallback((check: boolean) => setChecked(check), []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      };
    
    const handleSave = () => {
        console.log("Close");
        handleClose();
    }

    return (
        <TemplateModal open={open} handleOpen={handleOpen} handleClose={handleClose}>
            <FormControl>
                <Typography variant="h5">{text}</Typography>
                <FormLabel>Name pack</FormLabel>
                <TextField
                    type='text'
                    margin="normal"
                    value={inputValue}
                    onChange={handleChange}
                />
                <FormControlLabel label={'Private pack'} control={<Checkbox
                    checked={checked} onChangeChecked={checkedCallBack}
                />} />
                <Stack direction="row" spacing={12}>
                    <Button title='cansel' onClickCallBack={handleClose} />
                    <Button title='save' onClickCallBack={handleSave} />
                </Stack>
            </FormControl>
        </TemplateModal>
    )
}


export default AddEditPackList;