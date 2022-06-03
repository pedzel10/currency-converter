import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import CurrentPrice from './source/components/CurrentPrice'
import Value from './source/components/Value'
import CalculateButton from './source/components/CalculateButton'
import SwapButton from './source/components/SwapButton'
import SettingsButton from './source/components/SettingsButton'
import SettingsModal from './source/components/SettingsModal'
import Footer from './source/components/Footer'

const App = () => {
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
