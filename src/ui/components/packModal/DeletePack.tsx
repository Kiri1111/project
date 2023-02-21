import { Typography, Stack } from '@mui/material'
import React from 'react'
import Button from '../../common/components/commonButton/Button'
import TemplateModal from '../../common/components/templateModal/TemplateModal'

const DeletePack: React.FC = () => {
    return (
        <TemplateModal>
            <Typography variant="h5">Delete Pack</Typography>
            <p>Do you really want to remove Pack Name?
                All cards will be deleted.</p>
                <Stack direction="row" spacing={12}>
                    <Button title='cansel' onClickCallBack={() =>{}}/>
                    <Button title='Delete' onClickCallBack={() =>{}}/>
                </Stack>
        </TemplateModal>
    )
}

export default DeletePack;
