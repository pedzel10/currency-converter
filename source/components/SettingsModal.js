import React, { useContext } from 'react'

import { SeparatorsContext } from '/index.js'

const SettingsModal = ({ setSeparators }) => {
    // const { decimal, thousands, formatNumber } = useContext(SeparatorsContext)
    // console.log(decimal, thousands, formatNumber)

    const setDotAsDecimalSeparator = () => {
        setSeparators(prevState => {
            return {
                ...prevState,
                decimal: '.',
                thousands: ',',
                formatNumber: prevState.formatNumber,
            }
        })
    }
    const setComaAsDecimalSeparator = () => {
        setSeparators(prevState => {
            return {
                ...prevState,
                decimal: ',',
                thousands: '.',
                formatNumber: prevState.formatNumber,
            }
        })
    }

    return (
        <>
            <div>
                <label>Separator dziesiętny</label>
                <button onClick={setDotAsDecimalSeparator}>.</button>
                <button onClick={setComaAsDecimalSeparator}>,</button>
            </div>
            <div>
                <label>Separator tysięcy</label>
                <button onClick={setComaAsDecimalSeparator}>.</button>
                <button onClick={setDotAsDecimalSeparator}>,</button>
            </div>
        </>
    )
}

export default SettingsModal
