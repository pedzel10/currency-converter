import React from 'react'

const CalculateButton = ({
    inputValue,
    inputCurrency,
    resultValue,
    resultCurrency,
    fetchCurrencyData,
}) => {
    const calculate = () => {
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

    return (
        <button onClick={calculate} className="main__calculate-button">
            Przelicz
        </button>
    )
}

export default React.memo(CalculateButton)
