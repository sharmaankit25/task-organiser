import React from 'react'

export default ({ align, text, message: { user_name, time } }) => {
    if (align === 'right') {
        return (
            <div className="columns is-mobile">
            <span className="column"></span>
            <span className="column">
                <div className="card has-background-primary" style={{ borderRadius: '3px' }}>
                <p style={{ padding: '0 6px 0 6px' }}>
                <span className="has-text-danger is-size-7">{ user_name }</span>
                <br />
                <span className="has-text-white">{ text }</span>
                </p>
                </div>
            </span>
            </div>
        )
    } else {
        return (
            <div className="columns is-mobile">
            <span className="column">
                <div className="card has-background-warning" style={{ borderRadius: '3px' }}>
                <p style={{ padding: '0 6px 0 6px' }}>
                <span className="has-text-danger is-size-7">{ user_name }</span>
                <br />
                <span className="has-text-white">{ text }</span>
                </p>
                </div>
            </span>
            <span className="column"></span>
            </div>
        )
    }
}
