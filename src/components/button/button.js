import React from 'react'
import './button.css'

function Button(props) {

    let cls = ['btn']

    cls.push(props.cls)

    return(
        <>
            <button
                onClick={() => alert("ee")}
                className={cls.join(' ')}>
                {props.text}
            </button>
        </>
    )
}

export default Button;