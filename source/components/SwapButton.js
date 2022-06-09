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
    // Swaps currencies and values
    // e.g. 1 PLN = 4,26 USD  ->  4,26 USD = 0,00 PLN
    // sets second value to 0,00 because 4,26 USD = 1 PLN is not true, user has the opportunity to recalculate result
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
        <button onClick={swapCurrencies} className="main__swap-button">
            <FontAwesomeIcon icon={faArrowDownLong} />
            <FontAwesomeIcon icon={faArrowUpLong} />
        </button>
    )
}

export default SwapButton
