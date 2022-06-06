import React, { StrictMode, createContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import API_KEYS from './api-keys'

import CurrentPrice from './source/components/CurrentPrice'
import Value from './source/components/Value'
import CalculateButton from './source/components/CalculateButton'
import SwapButton from './source/components/SwapButton'
import SettingsButton from './source/components/SettingsButton'
import SettingsModal from './source/components/SettingsModal'
import Footer from './source/components/Footer'

export const SeparatorsContext = createContext({
    decimal: ',',
    thousands: '.',
    formatNumber: function () {},
})

const App = () => {
    const [separators, setSeparators] = useState({
        decimal: ',',
        thousands: '.',
        formatNumber,
    })

    const [currencyList, setcurrencyList] = useState(null)

    const [inputValue, setInputValue] = useState(1)
    const [inputCurrency, setInputCurrency] = useState('USD')
    const [resultValue, setResultValue] = useState(0)
    const [resultCurrency, setResultCurrency] = useState('PLN')

    const [price, setPrice] = useState(1)

    const formatNumber = number => {
        return number
    }

    const showResult = result => {
        const resultV = result.result
        setPrice(result.info.rate)

        if (inputValue > 0) {
            setResultValue(resultV)
        } else if (resultValue > 0) {
            setInputValue(resultV)
        }
    }

    let URL = ''
    const fetchCurrencyData = async (
        type = 'all',
        from = 'PLN',
        to = 'PLN',
        amount = 1
    ) => {
        const headers = new Headers()
        headers.append('apikey', API_KEYS)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers,
        }

        if (type === 'all') {
            URL = 'https://api.apilayer.com/exchangerates_data/symbols'
            await fetch(URL, requestOptions)
                .then(response => response.json())
                .then(result => setcurrencyList(result))
                .catch(error => console.log('error', error))
        } else if (type === 'convert') {
            URL = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`
            await fetch(URL, requestOptions)
                .then(response => response.json())
                .then(result => showResult(result))
                .catch(error => console.log('error', error))
        }
    }

    useEffect(() => {
        fetchCurrencyData('all')
        setSeparators({
            decimal: ',',
            thousands: '.',
            formatNumber,
        })
    }, [])

    // za pierwszym razem inputValue się nie zmienia
    // useEffect(() => {
    //     setResultValue(0)
    // }, [inputValue])
    // useEffect(() => {
    //     setInputValue(0)
    // }, [resultValue])

    if (!currencyList) return <div>Loading...</div>

    return (
        <StrictMode>
            <main>
                <SeparatorsContext.Provider
                    value={{
                        decimal: separators.decimal,
                        thousands: separators.thousands,
                        formatNumber: separators.formatNumber,
                    }}
                >
                    <CurrentPrice
                        inputValue={inputValue}
                        inputCurrency={inputCurrency}
                        resultValue={resultValue}
                        resultCurrency={resultCurrency}
                        price={price}
                    />
                    <Value
                        data={currencyList}
                        amount={inputValue}
                        currency={inputCurrency}
                        setInputValue={setInputValue}
                        setResultValue={setResultValue}
                        setCurrency={setInputCurrency}
                        type="input"
                    />
                    <Value
                        data={currencyList}
                        amount={resultValue}
                        currency={resultCurrency}
                        setInputValue={setInputValue}
                        setResultValue={setResultValue}
                        setCurrency={setResultCurrency}
                        type="result"
                    />
                    <CalculateButton
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        inputCurrency={inputCurrency}
                        resultValue={resultValue}
                        setResultValue={setResultValue}
                        resultCurrency={resultCurrency}
                        fetchCurrencyData={fetchCurrencyData}
                    />
                    <SwapButton
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        inputCurrency={inputCurrency}
                        setInputCurrency={setInputCurrency}
                        resultValue={resultValue}
                        setResultValue={setResultValue}
                        resultCurrency={resultCurrency}
                        setResultCurrency={setResultCurrency}
                    />
                    <SettingsButton />
                    <SettingsModal />
                </SeparatorsContext.Provider>
                <Footer />
            </main>
        </StrictMode>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
