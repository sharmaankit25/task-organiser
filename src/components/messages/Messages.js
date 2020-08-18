import React, { useState, useEffect, useRef } from 'react'
import MessageBox from './MessageBox'
import { connect } from 'react-redux'
import { sendMessages, loadMessages } from '../../actions'
import QuickView from '../QuickView'
const Messages = ({ sendMessages, loadMessages, groupId, messages, auth }) => {
  const messagesEndRef = useRef()
  useEffect(() => {
    loadGroupMessage()
  }, [])
  const loadGroupMessage = async () => {
    await loadMessages('group', groupId)
    scrollToBottom()
  }

  const [message, setMessage] = useState('')
  const sendMessage = async evt => {
    evt.preventDefault()
    await sendMessages('group', groupId, message)
    scrollToBottom()
    setMessage('')
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
  }

  const [chatModal, setChatModal] = useState(false)
  return (
    <>
    <QuickView
      onClose={state => setChatModal(state)  }
      status={chatModal}
      title='Messages'
      footer={
        <form className='card-footer-item' onSubmit={sendMessage}>
          <div className='field has-addons'>
            <p className='control'>
              <input
                className='input'
                type='text'
                placeholder='Message'
                required
                aria-required
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </p>
            <p className='control'>
              <button className='button is-info'>Send</button>
            </p>
          </div>
        </form>
      }
    >

        <div
          ref={messagesEndRef}
          className='card-content'
          style={{ maxHeight: '78vh', overflowY: 'scroll' }}
        >
          <div className='content'>
            {messages.map(m => {
              return (
                <MessageBox
                  key={m.time}
                  align={auth.user.id === m.user_id ? 'right' : 'left'}
                  text={m.message}
                  message={m}
                />
              )
            })}
          </div>
        </div>
    </QuickView>
    <button style={{ position: 'fixed', bottom: 0, right:2 }} onClick={e => setChatModal(!chatModal)} className='button is-info is-medium'>
      <span className="icon">
        <i className={`fas fa-comments`} ></i>
      </span>
    </button>
    </>
  )
}

const mapStateToProps = ({ messages, auth }) => ({ messages, auth })

export default connect(mapStateToProps, { sendMessages, loadMessages })(
  Messages
)
