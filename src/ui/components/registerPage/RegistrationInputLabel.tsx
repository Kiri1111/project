import React from 'react';
import {Input} from '../../common/components/commonInput/Input';


type RegistrationInputLabelPropsType = {
    text: string
}

export const RegistrationInputLabel: React.FC<RegistrationInputLabelPropsType> = ({text, ...props}) => {
  return (
    <div>
        <label className="form__label">{text}</label>
        <Input {...props}/>
    </div>
  )
}
