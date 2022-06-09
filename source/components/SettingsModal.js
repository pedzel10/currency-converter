import React from 'react'

const SettingsModal = ({ setSeparators }) => {
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
        <div className="main__settings-modal">
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
        </div>
    )
}

export default React.memo(SettingsModal)
