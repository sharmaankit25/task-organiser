import React from 'react'

export default ({ align, text }) => {
    if (align === 'right') {
        return (
            <div className="columns is-mobile">
            <span className="column"></span>
            <span className="column">
                <div className="box has-background-primary">
                <span className="has-text-white">{ text }</span>
                </div>
            </span>
            </div>
        )
    } else {
        return (
            <div className="columns is-mobile">
            <span className="column">
                <div className="box has-background-warning">
                { text }
                </div>
            </span>
            <span className="column"></span>
            </div>
        )
    }
}
