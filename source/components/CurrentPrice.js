import React, { useContext, useRef } from 'react'

import { SeparatorsContext } from '/index.js'

const CurrentPrice = ({
    inputCurrency,
    resultCurrency,
    price,
    setShowCurrentPrice,
    showCurrentPrice,
}) => {
    const { thousands, formatNumber } = useContext(SeparatorsContext)
    let price2 = 1 / price

    const priceRate = useRef()

    return (
        <div
            className={
                showCurrentPrice
                    ? 'main__current-price main__current-price--active'
                    : 'main__current-price'
            }
            ref={priceRate}
        >
            <p>
                1 {inputCurrency} ={' '}
                {
                    formatNumber(
                        price.toString().replace(/\./g, ','),
                        thousands
                    ).string
                }{' '}
                {resultCurrency}
            </p>
            <p>
                1 {resultCurrency} ={' '}
                {
                    formatNumber(
                        price2.toString().replace(/\./g, ','),
                        thousands
                    ).string
                }{' '}
                {inputCurrency}
            </p>
        </div>
    )
}

export default React.memo(CurrentPrice)
