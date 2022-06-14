import React, {
    StrictMode,
    createContext,
    useCallback,
    useEffect,
    useState,
} from 'react'
import ReactDOM from 'react-dom/client'

import API_KEYS from './api-keys'

import './source/SCSS/style.scss'

import CurrentPrice from './source/components/CurrentPrice'
import Value from './source/components/Value'
import CalculateButton from './source/components/CalculateButton'
import SwapButton from './source/components/SwapButton'
import SettingsButton from './source/components/SettingsButton'
import SettingsModal from './source/components/SettingsModal'
import Footer from './source/components/Footer'

export const SeparatorsContext = createContext()

const App = () => {
    // User has the ability to change separation characters
    // e.g. 1,222.33 or 1.222,33
    const [separators, setSeparators] = useState({
        decimal: ',',
        thousands: '.',
        formatNumber,
    })

    const [allCurrencies, setAllCurrencies] = useState(null)
    const [inputCurrencyList, setInputCurrencyList] = useState(null)
    const [resultCurrencyList, setResultCurrencyList] = useState(null)

    const [inputValue, setInputValue] = useState(1)
    const [inputCurrency, setInputCurrency] = useState('USD')
    const [resultValue, setResultValue] = useState(0)
    const [resultCurrency, setResultCurrency] = useState('PLN')

    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [showCurrentPrice, setShowCurrentPrice] = useState(false)

    // Price rate  e.g. 1 USD = 4,26 PLN
    const [price, setPrice] = useState(1)

    const formatNumber = (number, thousands) => {
        number = number.toString()
        if (thousands === '.') number = number.replace('.', ',')
        if (thousands === ',') number = number.replace(',', '.')

        const location = thousands === '.' ? 'de-DE' : 'en-US'

        if (thousands === '.')
            number = number.replace(/\./g, '').replace(',', '.')

        if (thousands === ',') number = number.replace(/\,/g, '')

        let resultInt = number
        let resultString = new Intl.NumberFormat(location, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number)

        return {
            string: resultString,
            int: parseFloat(resultInt),
        }
    }

    const showResult = result => {
        const resultV = result.result
        setPrice(result.info.rate)

        if (inputValue > 0) setResultValue(resultV)
        else if (resultValue > 0) setInputValue(resultV)
    }

    let URL = ''

    // Fetches data form https://exchangeratesapi.io/
    // type = 'all' returns all available currencies
    // type = 'convert' returns result of conversion
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
                .then(result => {
                    const allCurrencies = [
                        ['EUR', 'Euro'],
                        ['GBP', 'British Pound Sterling'],
                        ['PLN', 'Polish Zloty'],
                        ['USD', 'United States Dollar'],
                        ...Object.entries(result.symbols).filter(el => {
                            if (
                                el[0] !== 'PLN' &&
                                el[0] !== 'GBP' &&
                                el[0] !== 'USD' &&
                                el[0] !== 'EUR'
                            )
                                return true
                            return false
                        }),
                    ]
                    // setting state on initial render
                    setAllCurrencies(allCurrencies)
                    setInputCurrencyList(allCurrencies)
                    setResultCurrencyList(allCurrencies)
                })
                .catch(error => console.log('error', error))
        } else if (type === 'convert') {
            URL = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`
            await fetch(URL, requestOptions)
                .then(response => response.json())
                .then(result => showResult(result))
                .catch(error => console.log('error', error))
        }
    }

    const closeModals = e => {
        if (
            e.target.closest('.main__settings-modal') ||
            e.target.closest('.main__settings-button') ||
            e.target.closest('.value__currency-list')
        )
            return
        setShowSettingsModal(false)
    }

    useEffect(() => {
        fetchCurrencyData('all')
        setSeparators({
            decimal: ',',
            thousands: '.',
            formatNumber,
        })
    }, [])

    if (!allCurrencies) return <div className="loading">Loading...</div>

    return (
        <StrictMode>
            <main className="main" onClick={closeModals}>
                <SeparatorsContext.Provider
                    value={{
                        decimal: separators.decimal,
                        thousands: separators.thousands,
                        formatNumber: separators.formatNumber,
                    }}
                >
                    <div className="main-container">
                        <CurrentPrice
                            inputCurrency={inputCurrency}
                            resultCurrency={resultCurrency}
                            price={price}
                            showCurrentPrice={showCurrentPrice}
                            setShowCurrentPrice={setShowCurrentPrice}
                        />
                        <div className="result-container">
                            <Value
                                data={allCurrencies}
                                amount={inputValue}
                                currency={inputCurrency}
                                setInputValue={setInputValue}
                                setResultValue={setResultValue}
                                setCurrency={setInputCurrency}
                                currencyList={inputCurrencyList}
                                setCurrencyList={setInputCurrencyList}
                                setShowCurrentPrice={setShowCurrentPrice}
                                type="input"
                            />
                            <Value
                                data={allCurrencies}
                                amount={resultValue}
                                currency={resultCurrency}
                                setInputValue={setInputValue}
                                setResultValue={setResultValue}
                                setCurrency={setResultCurrency}
                                currencyList={resultCurrencyList}
                                setCurrencyList={setResultCurrencyList}
                                setShowCurrentPrice={setShowCurrentPrice}
                                type="result"
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
                                setShowCurrentPrice={setShowCurrentPrice}
                            />
                        </div>
                        <CalculateButton
                            inputValue={inputValue}
                            inputCurrency={inputCurrency}
                            resultValue={resultValue}
                            resultCurrency={resultCurrency}
                            fetchCurrencyData={fetchCurrencyData}
                            setShowCurrentPrice={setShowCurrentPrice}
                        />
                        <SettingsButton
                            setShowSettingsModal={setShowSettingsModal}
                        />
                        <SettingsModal
                            setSeparators={setSeparators}
                            showSettingsModal={showSettingsModal}
                        />
                    </div>
                </SeparatorsContext.Provider>
                <Footer />
            </main>
        </StrictMode>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
