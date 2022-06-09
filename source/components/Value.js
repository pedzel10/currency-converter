import React, { createRef, useContext, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

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
    showCurrencyList,
    setShowCurrencyList,
    type,
}) => {
    const format = useContext(SeparatorsContext).formatNumber

    // currency list is divided into 2 parts
    // - Main -> EUR, GBP, PLN, USD
    // - Other
    // before each list starts there's 'Main' or 'All' label

    // if there're no currencies in on of the 2 part, the whole parts, so as the label, is not displayed
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

    // sets State after user typed in the search input
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
        currencyListElement.current.classList.remove(
            'value__currency-list--active'
        )
    }

    // when user is typying in one of the inputs, automatically sets value of the other input to 0,00
    const displayValues = () => {
        if (type === 'input') setResultValue(0)

        if (type === 'result') setInputValue(0)
    }

    const { thousands } = useContext(SeparatorsContext)

    // Formats values according to separation characters set by the user
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

    const currencyListElement = createRef()
    const showOptions = () =>
        currencyListElement.current.classList.toggle(
            'value__currency-list--active'
        )

    const resultInput = createRef()

    useEffect(() => {
        console.log(showCurrencyList)

        if (showCurrencyList)
            currencyListElement.current.classList.add(
                'value__currency-list--active'
            )
        if (showCurrencyList === false)
            currencyListElement.current.classList.remove(
                'value__currency-list--active'
            )
        changeCurrencyList()

        // Formats value after changes in state
        // function 'formatValue()' fires only on input blur
        resultInput.current.value = format(
            amount.toString().replace(/\./g, ','),
            thousands
        ).string
    }, [amount, thousands, showCurrencyList])

    return (
        <div className="main__value value">
            <button
                ref={currencyButton}
                onClick={showOptions}
                className="value__choose-currency-button"
            >
                <span className="value__currency-symbol">{currency}</span>
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <div
                className="value__currency-list currency-list"
                ref={currencyListElement}
            >
                <div>
                    <input
                        type="search"
                        placeholder="Enter currency"
                        onChange={changeCurrencyList}
                        ref={search}
                        className="currency-list__search"
                    />
                </div>
                <ul style={{}} className="currency-list__ul">
                    {listToDisplay.map(el => {
                        if (el[0] == 'Main' || el[0] == 'All')
                            return (
                                <li
                                    className={`${el[0].toLowerCase()}-label`}
                                    key={el[0]}
                                >
                                    {el[0]}
                                </li>
                            )
                        return (
                            <li
                                data-ticker={el[0]}
                                key={el[0]}
                                onClick={displayCurrency}
                                className="currency-list__element element"
                            >
                                <span className="element__ticker">
                                    {el[0]}{' '}
                                </span>
                                <span className="element__name">{el[1]}</span>
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
                className="value__input"
            />
        </div>
    )
}

export default React.memo(Value)
