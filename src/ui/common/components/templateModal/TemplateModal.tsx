import React, {PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,


};


type TemplateModalType = {
    open: boolean
    handleClose: () => void
}


const TemplateModal: React.FC<PropsWithChildren<TemplateModalType>> = ({children, open, handleClose}) => {

    return (
        <div>
            <Modal
                // style={{opacity: '20%'}}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

export default TemplateModal;