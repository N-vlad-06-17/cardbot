import React from 'react'
import './mainImg.css'

function MainImg() {
    return(
        <div className="phone">
            <img src="phone_layer_1.svg" className="layer_phone" alt=">>"/>
            <img src="phone_layer_2.svg" className="layer_screen" alt=">>"/>
            <img src="phone_layer_3.svg" className="layer_content" alt=">>"/>
        </div>
    )
}

export default MainImg;