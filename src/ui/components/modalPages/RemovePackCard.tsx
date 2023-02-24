import {Stack, Typography} from '@mui/material'
import React, {useCallback} from 'react'
import Button from '../../common/components/commonButton/Button'
import TemplateModal from '../../common/components/templateModal/TemplateModal'
import {CardPacksType} from "../../../dal/api/authApi";


type DeletePackType = {
    list?: CardPacksType
    openModal: boolean
    setOpenModal: (value: boolean) => void
}

const RemovePackCard: React.FC<DeletePackType> = ({openModal, list, setOpenModal}) => {
    const handleClose = useCallback(() => setOpenModal(false), []);

    const handleRemove = () => {
        handleClose();
    }

    return (
        <TemplateModal open={openModal} handleClose={handleClose}>
            <Typography variant="h5">Delete pack?</Typography>
            <p>Do you really want to remove {list?.name} pack?</p>
            <Stack direction="row" spacing={12}>
                <Button title='Cancel' onClickCallBack={handleClose}/>
                <Button title='Delete' onClickCallBack={handleRemove}/>
            </Stack>
        </TemplateModal>
    )
}

export default RemovePackCard;
