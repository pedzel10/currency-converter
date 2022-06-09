import React, { createRef, useContext, useEffect } from 'react'

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

    const priceRate = createRef()

    useEffect(() => {
        if (showCurrentPrice)
            priceRate.current.classList.add('main__current-price--active')
        if (showCurrentPrice === false)
            priceRate.current.classList.remove('main__current-price--active')
        // setShowCurrentPrice(false)
    }, [inputCurrency, resultCurrency, showCurrentPrice])

    return (
        <div className="main__current-price" ref={priceRate}>
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
