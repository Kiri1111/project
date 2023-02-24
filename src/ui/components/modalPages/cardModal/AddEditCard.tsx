import { FormControl, FormLabel, TextField, Typography, FormControlLabel, Stack, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import TemplateModal from '../../../common/components/templateModal/TemplateModal';
import Button from '../../../common/components/commonButton/Button';
import { useFormik } from "formik";



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
      select: 'Text',
    },
    onSubmit: () => {

    }
  });

  return (
    <TemplateModal open={open} handleOpen={handleOpen} handleClose={handleClose}>
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
          <Button title='cansel' onClickCallBack={handleClose} />
          <Button title='save' onClickCallBack={() => { }} />
        </Stack>
      </FormControl>
    </TemplateModal>
  )
}


export default AddEditCard;
