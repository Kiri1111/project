import {FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography} from '@mui/material';
import React from 'react';
import TemplateModal from '../../../common/components/templateModal/TemplateModal';
import Button from '../../../common/components/commonButton/Button';
import {useFormik} from "formik";
import {useAppDispatch} from "../../../../hooks/redux";
import {addCardTC, updateCardTC} from "../../../../bll/reducers/cards";
import {CardType} from "../../../../dal/api/cardApi";


type AddEditCardModalType = {
    isVisible:boolean
    close: () => void
    text?: string
    packId?: string | undefined
    userId?:string | undefined
    dataEditCard?:CardType | undefined
}


const AddEditCard: React.FC<AddEditCardModalType> = ({isVisible,packId, userId,close, text,dataEditCard}) => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            select: 'Text',
        },
        onSubmit: values => {
            if (!dataEditCard) {
                dispatch(addCardTC({...values, cardsPack_id: packId ?? ''}))
            } else {
                dispatch(updateCardTC({...values,_id:dataEditCard._id,cardsPack_id: packId,user_id:userId ?? ''}))
            }


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
