import React,{useState,useRef} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './App.css';

const App = () => {

  const socket = useRef()

  const [connected,setConnected] = useState(false)

  const [value,setValue] = useState('')

  const [messages,setMessages] = useState([])

  const [name,setName] = useState('')

  const connect = () =>{
    socket.current = new WebSocket('ws://chat-app-kirill.herokuapp.com/')
    
      socket.current.onopen = () => {
          setConnected(true)
          const message = {
              event: 'connection',
              name,
              id: Date.now()
          }
          socket.current.send(JSON.stringify(message))
      }
      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data)
        setMessages(prev => [message, ...prev])
    }
  }

  const sendMessage = async () => {
    const today = new Date();

    const time = `${today.getHours()}:${today.getMinutes()}`;
    const message = {
        name,
        message: value,
        id: Date.now(),
        event: 'message',
        time
    }
    socket.current.send(JSON.stringify(message));
    setValue('');
  }
  return (
    <div className="app">
      {connected ?  
      <div className="form__messange form">  
      <ul className="message__list">
        <Scrollbars style={{ width: 600, height: 400 }}>
          {messages.map(mess =>
             <li key={mess.id}>
               {mess.event === 'connection'
               ? <div className="connection_message">
                   Пользователь {mess.name} подключился
               </div>
               : <div className="message"> 
               <div className="message__user"><span>{mess.message}</span></div>
                   <div className="message__user__info">            
                     <div className="message__user-name">{mess.name}</div>,
                     <div className="message__user__times">{mess.time}</div>
                   </div>
                  
                  </div>
              }
              </li>
            )}
        </Scrollbars>        
       </ul>
        <div className="form__content">
        <textarea value={value} className='input__messange' onChange={e => setValue(e.target.value)}></textarea>       
        <div className="form__btn" onClick={() => sendMessage()}>
          <span>Отправить</span>
        </div>
        </div>   
      </div>      
      :
         <div className="form__login form">
         <div className="form__content">
            <textarea placeholder="Имя пользователя" className='input__messange' onChange={e => setName(e.target.value)}></textarea>         
            <div className="form__btn" onClick={() => connect()}>
              <span>Войти</span>
            </div>
         </div>       
        </div>
      }
         
    </div>
  );
}

export default App;
