import "antd/dist/antd.css";
import './App.css';
import { Button, Input } from 'antd';
import { useState } from 'react';
import _ from 'lodash';
export const BASE_URL = 'http://localhost:1337';

const getCurrentUser = () => {
  return localStorage.getItem('current_user');
}

function App() {
  const [showUserInput, setShowUserInput] = useState(false);
  const [EpiId, setEpiId] = useState('')
  const handlePaymentTrigger = () => {
      setShowUserInput(true)
  };

  const [paymentObject, setPaymentObject] = useState(null);
  
  const handleSendPaymentRequest = () => {
      // send message
      handleRequest()
      .then(result => {
        console.log('result:', result);
        pollMessagesForCurrentMessage(result?.data?.id);
          // start polling messages
      })
  }

  const fetchMessages = (threadUser) => {
    return fetch(`${BASE_URL}/messages?sender=${getCurrentUser()}&recipient=${threadUser}`)
    .then(res => res.json())
  };


  const pollMessagesForCurrentMessage = (targetMessageId) => {
    const interval = setInterval(() => {
        fetchMessages(EpiId)
        .then(({messages: _messages}) => {
          console.log('poll result', _messages);
          const _messageInFocus = _.find(_messages, (_message) => {
              return parseInt( _message.id) === parseInt(targetMessageId);
          })

          console.log('_messageInFocus:', _messageInFocus);
          setPaymentObject(_messageInFocus)

        })
        .catch(err => {
          clearInterval(interval);
          console.error(err)
        })
    },2000)
  }


  const handleRequest = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return fetch(`${BASE_URL}/message`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        "type": "request",
        "sender": getCurrentUser(),
        "recipient": EpiId,
        "txDetails": {
          "amount": 13
        }
      }),
    })
    .then(response => response.json())
  }


  return (
    <div className="App">
      <Button onClick={handlePaymentTrigger}>
        pay using EPI
      </Button>

      
      {showUserInput && <Input placeholder='enter your EPI id' onChange={e => {
        setEpiId(e.target.value);
      }} value={EpiId} /> }

{
  EpiId &&
  <Button onClick={handleSendPaymentRequest}>
        send payment request
      </Button>
}

{
  paymentObject && <div> 
    message status: {paymentObject?.status}

  </div>
}
      
    

    </div>
  );
}

export default App;
