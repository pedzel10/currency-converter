import React from 'react'

const Value = props => {
    const object = props.data.symbols
    const list = Object.entries(object)

    return (
        <>
            <button>{props.currency}</button>
            <div>
                <div>
                    <input type="search" placeholder="Enter currency" />
                </div>
                <ul
                    style={{
                        height: '200px',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                        width: '15%',
                        listStyle: 'none',
                    }}
                >
                    <li>Main</li>
                    <li>
                        <span>PLN </span>
                        <span>Polish Zloty</span>
                    </li>
                    <li>
                        <span>USD </span>
                        <span>United States Dollar</span>
                    </li>
                    <li>
                        <span>EUR </span>
                        <span>Euro</span>
                    </li>
                    <li>
                        <span>GPB </span>
                        <span>British Pound Sterling</span>
                    </li>
                    <li>------------------</li>
                    <li>All</li>
                    {list.map(el => {
                        return (
                            <li key={el[0]}>
                                <span>{el[0]} </span>
                                <span>{el[1]}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <input
                type="number"
                defaultValue={props.amount}
                placeholder="Enter amount"
            />
        </>
    )
}

export default Value
