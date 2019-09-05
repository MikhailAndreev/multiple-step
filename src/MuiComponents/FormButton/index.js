import React from 'react';

const FormButton = (props) => {
    return <button
        onClick={props.handleClick}
        id={props.id}
        className={props.style}
    >
        {props.name}
    </button>
};

export default FormButton;