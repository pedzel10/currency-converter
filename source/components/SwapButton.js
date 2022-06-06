import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons'

const SwapButton = ({
    inputValue,
    setInputValue,
    inputCurrency,
    setInputCurrency,
    setResultValue,
    resultValue,
    resultCurrency,
    setResultCurrency,
}) => {
    const swapCurrencies = () => {
        if (inputValue > 0 && resultValue > 0) {
            setInputValue(resultValue)
            setResultValue(0)
            setInputCurrency(resultCurrency)
            setResultCurrency(inputCurrency)
        } else {
            setInputValue(resultValue)
            setResultValue(inputValue)
            setInputCurrency(resultCurrency)
            setResultCurrency(inputCurrency)
        }
    }

    return (
        <button onClick={swapCurrencies}>
            <FontAwesomeIcon icon={faArrowDownLong} />
            <FontAwesomeIcon icon={faArrowUpLong} />
        </button>
    )
}

export default SwapButton
