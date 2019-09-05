import React from 'react';
//библиотека для быстрой генерации маски для инпута
import InputMask from 'react-input-mask';


const FormInput = (props) => {
    return <label htmlFor=""
    >{props.label}
        <InputMask
            onChange={props.handleChange}
            value={props.value}
            className={props.classname}
            name={props.name}
            onClick={props.handleClick}
            id={props.id}
            {...props}
            mask={props.mask}
            maskChar={props.maskChar} />
    </label>
};

export default FormInput;