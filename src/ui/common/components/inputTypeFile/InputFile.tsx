import React, {ChangeEvent, FC, useRef} from 'react';

type PropsType = {
    callBack: (file64: string) => void
}

export const InputTypeFile: FC<PropsType> = ({callBack}) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const file64 = reader.result as string
                    callBack(file64)
                }
                reader.readAsDataURL(file)
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }
    return (
        <div>
            <span style={{textDecoration: 'underline', color: 'blue'}} onClick={selectFileHandler}>Change cover</span>
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={uploadHandler}
            />
        </div>
    )
}
