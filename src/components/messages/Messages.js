import React, {useState} from 'react'

export default () => {
    const [message, setMessage] = useState('')
    const sendMessage = (evt) => {
        evt.preventDefault();
        console.log('Send Message', message)
        setMessage('')
    }
    return (
        <>
        <div class="card">
        <header class="card-header">
            <p class="card-header-title">
            Messages
            </p>
        </header>
        <div class="card-content">
            <div class="content">
            <div>

        <div className="columns">
            <span className="column is-four-fifths"></span>
            <span className="column box">Message 1</span>
        </div>
        <div className="columns">
            <span className="column box">Message 2</span>
            <span className="column is-four-fifths"></span>
        </div>
        </div>
            </div>
        </div>
        <footer class="card-footer">
        <form className="card-footer-item" onSubmit={sendMessage}>
        <div class="field has-addons">
            <p class="control">
                <input className="input" type="text" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
            </p>
            <p class="control">
                <button className="button is-info">Send</button>
            </p>
        </div>
    </form>
        </footer>
        </div>



        </>
    )
}
