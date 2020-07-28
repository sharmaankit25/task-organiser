import React, {useState, useEffect} from 'react'
import MessageBox from './MessageBox'
import { connect } from 'react-redux'
import { sendMessages, loadMessages } from '../../actions'
const Messages = ({ sendMessages, loadMessages, groupId, messages, auth }) => {
    useEffect(() => {
        loadGroupMessage()
    }, [])
    const loadGroupMessage = async () => {
        await loadMessages('group', groupId)
    }

    const [message, setMessage] = useState('')
    const sendMessage = (evt) => {
        evt.preventDefault();
        sendMessages('group', groupId, message)
        setMessage('')
    }
    return (
        <>
        <div className="card">
        <header className="card-header">
            <p className="card-header-title">
            Messages
            </p>
        </header>
        <div className="card-content">
            <div className="content">
            <div>
            {
                messages.map(m => {
                    return <MessageBox key={m.time}
                        align={ auth.user.id === m.user_id ? 'right' : 'left'}
                        text={m.message} />
                })
            }
        </div>
            </div>
        </div>
        <footer className="card-footer">
        <form className="card-footer-item" onSubmit={sendMessage}>
        <div className="field has-addons">
            <p className="control">
                <input className="input" type="text" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
            </p>
            <p className="control">
                <button className="button is-info">Send</button>
            </p>
        </div>
    </form>
        </footer>
        </div>
        </>
    )
}

const mapStateToProps = ({ messages, auth }) => ({ messages, auth })

export default connect(mapStateToProps, { sendMessages, loadMessages })(Messages)
