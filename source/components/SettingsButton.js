import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const SettingsButton = () => {
    return (
        <button className="main__settings-button">
            <FontAwesomeIcon icon={faGear} />
        </button>
    )
}

export default SettingsButton
