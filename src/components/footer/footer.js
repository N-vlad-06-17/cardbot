import React from 'react'
import './footer.css'

function Footer() {
    return(
            <div className="footer">
                <p>Все права защищены © 2021</p>
                <div className="footerImg">
                    <p>nosov.vlad.54@gmail.com</p>
                    <a href="https://vk.com/ne_starosta" target="_blank" rel="noreferrer"><img src="footer_vk.svg" alt="vk"/></a>
                </div>
            </div>
    )
}

export default Footer;