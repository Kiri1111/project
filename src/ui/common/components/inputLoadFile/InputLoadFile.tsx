import React, { ChangeEvent } from 'react'
import Button from '../commonButton/Button'
// import { Button } from '@mui/material';
import { Input } from '../commonInput/Input'

const InputLoadFile = () => {

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
            
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <label style={{ position: 'relative', display: 'inline-block'}}>
            <Input type="file"
                onChange={uploadHandler}
                style={{display: 'block', opacity: '0', position: 'absolute', width: '100%', height: '100%', cursor: 'pointer'}}
            />
            <Button style={{width: '100%'}} title='upload file' onClickCallBack={() => {}}/>
        </label>
    )
}


export default InputLoadFile;
