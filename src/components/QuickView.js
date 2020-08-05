import React, { useState, useEffect } from 'react'

export default ({ status, title, header, children, footer, onClose }) => {
    useEffect(() => setToggle(status), [status])
    const [ toggle, setToggle ] = useState(false)

    const closeModal = () => {
        setToggle(false)
        onClose(false)
    }
    return (
        <div id="quickviewDefault" className={`quickview ${toggle && 'is-active'}`}>
            <header className="quickview-header">
                <p className="title">{ title }</p>
                { header }
                <span onClick={closeModal} className="delete" data-dismiss="quickview"></span>
            </header>
            <div className="quickview-body">
                <div className="quickview-block">
                { children }
                </div>
            </div>

            <footer className="quickview-footer">{footer}</footer>
        </div>
    )
}
