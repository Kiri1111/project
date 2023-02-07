import React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {setNewAvatarTC} from "../../../bll/reducers/profile";
import button from "../../common/components/commonButton/Button";
import style from "./Profile.module.scss";
import photoIcon from "../../common/assets/images/photoIcon.png";

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
    const [editMode, setEditMode] = useState(false)

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

    const sendNewAvatar = () => {
        dispatch(setNewAvatarTC(base64))
        setEditMode(false)
    }

    const setAvatarBackground = {
        backgroundImage: `url(${photoIcon})`
    }

    return (<div className={style.photoIcon}>
            {
                editMode
                    ? <div>
                        <input
                            className={style.inputFile}
                            id="file"
                            name="file"
                            type="file"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e?.target.files)}
                        />
                        <label style={setAvatarBackground} className={style.label} htmlFor="file"></label>
                        <button
                            onClick={sendNewAvatar}>send
                        </button>
                    </div>
                    : <div>
                        <img
                            alt={'change avatar'}
                            src={photoIcon}
                            onClick={() => {
                                setEditMode(true)
                            }}
                        />

                    </div>
            }
        </div>
    );
}

