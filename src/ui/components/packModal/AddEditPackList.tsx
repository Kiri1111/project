import React from 'react';
import TemplateModal from '../../common/components/templateModal/TemplateModal';
import Checkbox from '../../common/components/commonCheckbox/Checkbox';
import { FormControl, FormControlLabel, FormLabel, TextField, Typography, Stack } from '@mui/material';
import Button from '../../common/components/commonButton/Button'


type AddEditPackListType = {
    text?: string
}

const AddEditPackList: React.FC<AddEditPackListType> = ({ text }) => {


    return (
        <TemplateModal>
            <FormControl>
                <Typography variant="h5">{text}</Typography>
                <FormLabel>Name pack</FormLabel>
                <TextField
                    margin="normal"
                />
                <FormControlLabel label={'Private pack'} control={<Checkbox
                    checked={true}
                />} />
                <Stack direction="row" spacing={12}>
                    <Button title='cansel' onClickCallBack={() =>{}}/>
                    <Button title='save' onClickCallBack={() =>{}}/>
                </Stack>
            </FormControl>
        </TemplateModal>
    )
}


export default AddEditPackList;