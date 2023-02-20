import React from 'react';
import TemplateModal from '../../common/templateModal/TemplateModal';
import { Input } from '../../common/components/commonInput/Input';
import Checkbox from '../../common/components/commonCheckbox/Checkbox';
import { FormControl, FormControlLabel, FormLabel, TextField, Typography } from '@mui/material';

const AddPackList = () => {
    return (
        <TemplateModal>
            <FormControl>
                <Typography variant="h5">Add new Pack</Typography>
                <FormLabel>Name pack</FormLabel>
                <TextField
                    margin="normal"
                />
                <FormControlLabel label={'Private pack'} control={<Checkbox
                    checked={true}
                />} />
            </FormControl>
        </TemplateModal>
    )
}


export default AddPackList;