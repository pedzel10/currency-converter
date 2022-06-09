import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    const copy = String.fromCodePoint(169)

    return (
        <footer className="main__footer">
            <span> {copy} </span> Stanisław Szarapka
            <a href="https://github.com/pedzel10" className="footer__gh-icon">
                <FontAwesomeIcon icon={faGithub} />
            </a>
        </footer>
    )
}

export default Footer
