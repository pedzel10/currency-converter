import React from 'react'

const SettingsModal = ({ setSeparators, showSettingsModal, separators }) => {
    const setSeparator = type => {
        let decimalSeparator
        let thousandsSeparator
        //type -> 'dot' - decimal serparator is dot
        //type -> 'coma' - decimal separator is coma
        if (type === 'dot') {
            decimalSeparator = '.'
            thousandsSeparator = ','
        }
        if (type === 'coma') {
            decimalSeparator = ','
            thousandsSeparator = '.'
        }
        console.log(decimalSeparator, thousandsSeparator)

        setSeparators(prevState => {
            return {
                ...prevState,
                decimal: decimalSeparator,
                thousands: thousandsSeparator,
                formatNumber: prevState.formatNumber,
            }
        })
    }

    return (
        <div
            className={
                showSettingsModal
                    ? 'main__settings-modal modal main__settings-modal--active'
                    : 'main__settings-modal modal'
            }
        >
            <div className="container">
                <label className="modal__label">Separator dziesiętny</label>
                <div className="modal__separators separators">
                    <button
                        className={
                            separators.decimal === '.'
                                ? 'separators__button--active separators__button'
                                : 'separators__button'
                        }
                        onClick={() => setSeparator('dot')}
                    >
                        .
                    </button>
                    <button
                        className={
                            separators.decimal === ','
                                ? 'separators__button--active separators__button'
                                : 'separators__button'
                        }
                        onClick={() => setSeparator('coma')}
                    >
                        ,
                    </button>
                </div>
            </div>
            <div className="container">
                <label>Separator tysięcy</label>
                <div className="modal__separators">
                    <button
                        className={
                            separators.thousands === '.'
                                ? 'separators__button--active separators__button'
                                : 'separators__button'
                        }
                        onClick={() => setSeparator('coma')}
                    >
                        .
                    </button>
                    <button
                        className={
                            separators.thousands === ','
                                ? 'separators__button--active separators__button'
                                : 'separators__button'
                        }
                        onClick={() => setSeparator('dot')}
                    >
                        ,
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SettingsModal)
