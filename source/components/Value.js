import React, { createRef, useContext, useEffect } from 'react'

import { SeparatorsContext } from '/index.js'

const Value = ({
    data,
    amount,
    currency,
    setInputValue,
    setResultValue,
    setCurrency,
    setCurrencyList,
    currencyList,
    type,
}) => {
    const format = useContext(SeparatorsContext).formatNumber

    let mainCurrencyExists = false
    let notMainCurrencyExists = false

    currencyList.some(el => {
        if (
            el[0] === 'PLN' ||
            el[0] === 'EUR' ||
            el[0] === 'GBP' ||
            el[0] === 'USD'
        ) {
            mainCurrencyExists = true
            return true
        }
    })

    currencyList.some(el => {
        if (
            el[0] !== 'PLN' &&
            el[0] !== 'EUR' &&
            el[0] !== 'GBP' &&
            el[0] !== 'USD'
        ) {
            notMainCurrencyExists = true
            return true
        }
    })

    const mainLabel = mainCurrencyExists ? ['Main'] : []
    const allLabel = notMainCurrencyExists ? ['All'] : []
    const mainCurrencies = currencyList.filter(
        el =>
            el[0] === 'PLN' ||
            el[0] === 'EUR' ||
            el[0] === 'GBP' ||
            el[0] === 'USD'
    )
    const notMainCurrencies = currencyList.filter(
        el =>
            el[0] !== 'PLN' &&
            el[0] !== 'EUR' &&
            el[0] !== 'GBP' &&
            el[0] !== 'USD'
    )

    const listToDisplay = [
        mainLabel,
        ...mainCurrencies,
        allLabel,
        ...notMainCurrencies,
    ].filter(el => el.length > 0)

    const search = createRef()

    const changeCurrencyList = () => {
        let newCurrencyList
        if (search.current.value === '') {
            newCurrencyList = data
            setCurrencyList(newCurrencyList)
            return
        }

        newCurrencyList = data.filter(el => {
            const ticker = el[0].toLowerCase()
            const name = el[1].toLowerCase()

            const result =
                ticker.search(search.current.value.toLocaleLowerCase()) > -1 ||
                name.search(search.current.value.toLocaleLowerCase()) > -1

            return result
        })
        setCurrencyList(newCurrencyList)
    }

    const currencyButton = createRef()
    const displayCurrency = e => {
        setCurrency(e.target.closest('li').dataset.ticker)
        search.current.value = ''
        setCurrencyList(data)
    }

    const displayValues = () => {
        if (type === 'input') setResultValue(0)

        if (type === 'result') setInputValue(0)
    }

    const { thousands } = useContext(SeparatorsContext)
    const formatValue = e => {
        search.current.value = ''
        setCurrencyList(data)

        if (type === 'input')
            setInputValue(format(e.target.value, thousands).int)
        else if (type === 'result')
            setResultValue(format(e.target.value, thousands).int)

        e.target.value = format(
            amount.toString().replace(/\./g, ','),
            thousands
        ).string
    }

    const resultInput = createRef()

    useEffect(() => {
        changeCurrencyList()
        resultInput.current.value = format(
            amount.toString().replace(/\./g, ','),
            thousands
        ).string
    }, [amount, thousands])

    return (
        <>
            <button ref={currencyButton}>{currency}</button>
            <div>
                <div>
                    <input
                        type="search"
                        placeholder="Enter currency"
                        onChange={changeCurrencyList}
                        ref={search}
                    />
                </div>
                <ul
                    style={{
                        height: '200px',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                        width: '45%',
                        listStyle: 'none',
                    }}
                >
                    {listToDisplay.map(el => {
                        if (el[0] == 'Main' || el[0] == 'All')
                            return <li key={el[0]}>{el[0]}</li>
                        return (
                            <li
                                data-ticker={el[0]}
                                key={el[0]}
                                onClick={displayCurrency}
                            >
                                <span>{el[0]} </span>
                                <span>{el[1]}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <input
                type="text"
                ref={resultInput}
                placeholder="Enter amount"
                onChange={displayValues}
                onBlur={formatValue}
            />
        </>
    )
}

export default React.memo(Value)
