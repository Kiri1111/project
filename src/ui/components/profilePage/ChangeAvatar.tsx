import React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {setNewAvatarTC} from "../../../bll/reducers/profile";
import button from "../../common/components/commonButton/Button";

const getBase64 = (file: FileList): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
    });
};

export const ChangeAvatar = () => {

    const dispatch = useAppDispatch()

    const [file, setFile] = useState<FileList | null>(null);
    const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);

    const setFileBase64 = async (file: FileList) => {
        const base = await getBase64(file);
        setBase64(base);
    };

    useEffect(() => {
        if (file) {
            setFileBase64(file);
        }
        return () => {
            setFile(null);
            setBase64(null);
        };
    }, [file]);


    console.log("fileBase64", base64);
    return (
        <div>
            <input
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e?.target.files)}
            />
            <button onClick={() => {
                dispatch(setNewAvatarTC(base64))
            }}>send
            </button>
        </div>
    );
}

