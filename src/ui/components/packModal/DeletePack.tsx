import { Typography, Stack } from '@mui/material'
import React, { useCallback } from 'react'
import Button from '../../common/components/commonButton/Button'
import TemplateModal from '../../common/components/templateModal/TemplateModal'



type DeletePackType = {
    packName?: string
    remove?: () => void
}

const DeletePack: React.FC<DeletePackType> = ({packName}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const handleRemove = () => {
        console.log("Remove");
        handleClose();
    }

    return (
        <TemplateModal open={open} handleOpen={handleOpen} handleClose={handleClose}>
            <Typography variant="h5">Delete Pack</Typography>
            <p>Do you really want to remove {packName}?
                All cards will be deleted.</p>
            <Stack direction="row" spacing={12}>
                <Button title='cansel' onClickCallBack={handleClose} />
                <Button title='Delete' onClickCallBack={handleRemove} />
            </Stack>
        </TemplateModal>
    )
}

export default DeletePack;
