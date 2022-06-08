import React, { useContext, useEffect } from 'react'

import { SeparatorsContext } from '/index.js'

const CurrentPrice = ({ inputCurrency, resultCurrency, price }) => {
    const { thousands, formatNumber } = useContext(SeparatorsContext)
    let price2 = 1 / price

    useEffect(() => {
        // toggle class
    }, [inputCurrency, resultCurrency])

    return (
        <>
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
        </>
    )
}

export default React.memo(CurrentPrice)
