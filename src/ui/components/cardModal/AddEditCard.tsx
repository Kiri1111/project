import { FormControl, FormLabel, TextField, Typography, FormControlLabel, Stack } from '@mui/material';
import React, { useCallback } from 'react';
import TemplateModal from '../../common/components/templateModal/TemplateModal';
import Button from '../../common/components/commonButton/Button';
import {useFormik} from "formik";



type AddEditCardModalType = {
  text?: string
}


const AddEditCard: React.FC<AddEditCardModalType> = ({ text }) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);


  
  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    onSubmit: () => {
      
    }
});

  return (
    <TemplateModal open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <FormControl>
        <Typography variant="h5">{text}</Typography>
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
          <Button title='cansel' onClickCallBack={handleClose} />
          <Button title='save' onClickCallBack={() => { }} />
        </Stack>
      </FormControl>
    </TemplateModal>
  )
}


export default AddEditCard;
