import React, { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import API_KEYS from './api-keys'

import CurrentPrice from './source/components/CurrentPrice'
import Value from './source/components/Value'
import CalculateButton from './source/components/CalculateButton'
import SwapButton from './source/components/SwapButton'
import SettingsButton from './source/components/SettingsButton'
import SettingsModal from './source/components/SettingsModal'
import Footer from './source/components/Footer'

const App = () => {
    const [currencyList, setcurrencyList] = useState(null)

    const [inputValue, setInputValue] = useState(1)
    const [inputCurrency, setInputCurrency] = useState('USD')
    const [resultValue, setResultValue] = useState(1)
    const [resultCurrency, setResultCurrency] = useState('USD')

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

        if (type === 'all')
            URL = 'https://api.apilayer.com/exchangerates_data/symbols'
        else if (type === 'convert')
            URL = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`

        await fetch(URL, requestOptions)
            .then(response => response.json())
            .then(result => setcurrencyList(result))
            .catch(error => console.log('error', error))
    }

    useEffect(() => {
        fetchCurrencyData('all')
    }, [])

    if (!currencyList) return <div>Loading...</div>

    return (
        <StrictMode>
            <main>
                <CurrentPrice />
                <Value
                    data={currencyList}
                    amount={inputValue}
                    currency={inputCurrency}
                />
                <Value
                    data={currencyList}
                    amount={resultValue}
                    currency={resultCurrency}
                />
                <CalculateButton />
                <SwapButton />
                <SettingsButton />
                <SettingsModal />
                <Footer />
            </main>
        </StrictMode>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
