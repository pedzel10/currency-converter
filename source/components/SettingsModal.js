import React, { createRef, useEffect } from 'react'

const SettingsModal = ({ setSeparators, showSettingsModal }) => {
    const modal = createRef()
    const buttonDotDecimal = createRef()
    const buttonComaDecimal = createRef()
    const buttonDotThousands = createRef()
    const buttonComaThousands = createRef()
    const setDotAsDecimalSeparator = () => {
        setSeparators(prevState => {
            return {
                ...prevState,
                decimal: '.',
                thousands: ',',
                formatNumber: prevState.formatNumber,
            }
        })
        buttonDotDecimal.current.classList.add('separators__button--active')
        buttonComaThousands.current.classList.add('separators__button--active')

        buttonComaDecimal.current.classList.remove('separators__button--active')
        buttonDotThousands.current.classList.remove(
            'separators__button--active'
        )
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

        buttonComaDecimal.current.classList.add('separators__button--active')
        buttonDotThousands.current.classList.add('separators__button--active')

        buttonDotDecimal.current.classList.remove('separators__button--active')
        buttonComaThousands.current.classList.remove(
            'separators__button--active'
        )
    }

    useEffect(() => {
        if (showSettingsModal)
            modal.current.classList.add('main__settings-modal--active')
        if (showSettingsModal === false)
            modal.current.classList.remove('main__settings-modal--active')
    }, [showSettingsModal])

    return (
        <div className="main__settings-modal modal" ref={modal}>
            <div className="container">
                <label className="modal__label">Separator dziesiętny</label>
                <div className="modal__separators separators">
                    <button
                        className="separators__button"
                        onClick={setDotAsDecimalSeparator}
                        ref={buttonDotDecimal}
                    >
                        .
                    </button>
                    <button
                        className="separators__button separators__button--active"
                        onClick={setComaAsDecimalSeparator}
                        ref={buttonComaDecimal}
                    >
                        ,
                    </button>
                </div>
            </div>
            <div className="container">
                <label>Separator tysięcy</label>
                <div className="modal__separators">
                    <button
                        className="separators__button separators__button--active"
                        onClick={setComaAsDecimalSeparator}
                        ref={buttonDotThousands}
                    >
                        .
                    </button>
                    <button
                        className="separators__button"
                        onClick={setDotAsDecimalSeparator}
                        ref={buttonComaThousands}
                    >
                        ,
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SettingsModal)
