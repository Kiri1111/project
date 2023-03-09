import React, { ChangeEvent, useState } from 'react'
import Button from '../commonButton/Button'
import { Input } from '../commonInput/Input'
import userPhoto from '../../assets/images/userPhoto.png';


// type InputLoadFileType = {
//     questionImg?: string
// } 


const InputLoadFile: React.FC = () => {

    const [questionImg, setQuestionImg] = useState('');

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log(file)
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setQuestionImg(file64);
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
    }

    return (
        <div style={{width: '100%', paddingTop: '10px'}}>
            <div style={{textAlign: 'center'}}>
                <img style={{width: '80px', height: '80px'}} src={questionImg || userPhoto} alt="photo icon" />
            </div>
            <label style={{ position: 'relative', display: 'block' }}>
                <Input type="file"
                    onChange={uploadHandler}
                    style={{ display: 'block', opacity: '0', position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                />
                <Button style={{ width: '100%' }} title='upload file' onClickCallBack={() => { }} />
            </label>
        </div>

    )
}


export default InputLoadFile;
