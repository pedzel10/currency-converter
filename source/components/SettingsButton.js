import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const SettingsButton = ({ setShowSettingsModal }) => {
    return (
        <button className="main__settings-button">
            <FontAwesomeIcon
                icon={faGear}
                onClick={() => setShowSettingsModal(true)}
            />
        </button>
    )
}

export default SettingsButton
