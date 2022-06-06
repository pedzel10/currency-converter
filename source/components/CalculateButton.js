import React from 'react'

const CalculateButton = ({
    inputValue,
    setInputValue,
    inputCurrency,
    setResultValue,
    resultValue,
    resultCurrency,
    fetchCurrencyData,
}) => {
    const setState = () => {
        if (inputValue > 0) {
            fetchCurrencyData(
                'convert',
                inputCurrency,
                resultCurrency,
                inputValue
            )
        } else if (resultValue > 0) {
            fetchCurrencyData(
                'convert',
                resultCurrency,
                inputCurrency,
                resultValue
            )
        }
    }

    return <button onClick={setState}>Przelicz</button>
}

export default CalculateButton
