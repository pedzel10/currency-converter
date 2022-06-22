import React from 'react'

const CalculateButton = ({ calculateResult }) => {
    return (
        <button onClick={calculateResult} className="main__calculate-button">
            Przelicz
        </button>
    )
}

export default React.memo(CalculateButton)
