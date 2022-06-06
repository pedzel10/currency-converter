import React from 'react'

const CurrentPrice = ({
    inputValue,
    inputCurrency,
    resultValue,
    resultCurrency,
    price,
}) => {
    return (
        <>
            <p>
                1 {inputCurrency} = {price} {resultCurrency}
            </p>
            <p>
                1 {resultCurrency} = {1 / price} {inputCurrency}
            </p>
        </>
    )
}

export default CurrentPrice
