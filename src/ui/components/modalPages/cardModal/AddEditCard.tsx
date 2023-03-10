import {FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography} from '@mui/material';
import React from 'react';
import TemplateModal from '../../../common/components/templateModal/TemplateModal';
import Button from '../../../common/components/commonButton/Button';
import {useFormik} from "formik";
import {useAppDispatch} from "../../../../hooks/redux";
import {addCardTC} from "../../../../bll/reducers/cards";


type AddEditCardModalType = {
    isVisible:boolean
    close: () => void
    text?: string
    cardId: string | undefined
}


const AddEditCard: React.FC<AddEditCardModalType> = ({isVisible,cardId, close, text}) => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            select: 'Text',
        },
        onSubmit: values => {
            dispatch(addCardTC({...values, cardsPack_id: cardId ?? ''}))
            close();
        }
    });



    return (
        <TemplateModal open={isVisible} handleClose={close}>
            <FormControl>
                <Typography variant="h5">{text}</Typography>
                <FormLabel>Choose a question format</FormLabel>
                <Select
                    id="select"
                    value={formik.values.select}
                    onChange={(event: SelectChangeEvent) => formik.setFieldValue('select', event.target.value)}
                >
                    <MenuItem value={'Text'}>Text</MenuItem>
                    <MenuItem value={'Number'}>Number</MenuItem>
                </Select>
                <FormLabel>Question</FormLabel>
                <TextField
                    type='text'
                    size='small'
                    margin="normal"
                    {...formik.getFieldProps('question')}
                />
                <FormLabel>Answer</FormLabel>
                <TextField
                    type='text'
                    size='small'
                    margin="normal"
                    {...formik.getFieldProps('answer')}
                />
                <Stack direction="row" spacing={12}>
                    <Button title='cancel' onClickCallBack={close}/>
                    <Button title='save'  type={'submit'} onClickCallBack={formik.handleSubmit}/>
                </Stack>
            </FormControl>
        </TemplateModal>
    )
}


export default AddEditCard;
