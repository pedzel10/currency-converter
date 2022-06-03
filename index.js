import React, { StrictMode } from 'react'
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

        let data = {}
        await fetch(URL, requestOptions)
            .then(response => response.json())
            .then(result => (data = result))
            .catch(error => console.log('error', error))

        return data
    }

    fetchCurrencyData('all')

    return (
        <StrictMode>
            <main>
                <CurrentPrice />
                <Value />
                <Value />
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
