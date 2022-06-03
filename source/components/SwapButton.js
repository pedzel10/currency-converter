import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons'

const SwapButton = () => {
    return (
        <button>
            <FontAwesomeIcon icon={faArrowDownLong} />
            <FontAwesomeIcon icon={faArrowUpLong} />
        </button>
    )
}

export default SwapButton
