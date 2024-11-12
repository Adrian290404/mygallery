import React from "react"
import logo from "../assets/logoTexto.png"

export const FooterComponent = () => {
    return (
    <>
        <footer className="footer">
            <img className="footer__logo" src={logo} />
            <h4 className="footer__text">© 2024 MyGallery, All Rights Reserved</h4>
        </footer>
    </>
    )
}