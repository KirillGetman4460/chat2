import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars';
import socket from "../socket"
import axios from 'axios';
const Room = () => {
  const idRoom = useSelector(state => state.idRoom)

  const userName = useSelector(state => state.userName)

  const users = useSelector(state => state.users)

  const [message,setMessage] = useState('')

  const [messages,setMessages] = useState([])

  const sendMessage = async(message) =>{
    socket.emit('SEND:MESSAGE',{message,idRoom,userName});
    setMessage(message = '')
    socket.on('GET:MESSAGE', data => setMessages(data));
  }
  useEffect(async()=>{
    await axios.get(`https://kirill-chat-app.herokuapp.com/rooms/${idRoom}`)
      .then(res => setMessages(res.data.messages))
    socket.on('GET:MESSAGE', data => setMessages(data));
  },[])
    return (
        <div className="room">
          <div className="room__conteiner">
            <div className="room__content">
            <div className="room__users__connect">
              <div className="room__users__room-number">
                Комната: {idRoom}
              </div>
            <div className="room__users__number">
              Онлайн: ({users ? users.length:null})
            </div>
            {users ? users.map(user => <ul className="room__users__list">
              <li className="room__user__link">{user}</li>
            </ul>):null}
          </div>
          <div className="room__massanges">
            <ul className="room__massanges__list">
            <Scrollbars style={{ width: 500, height: 255 }}>
            {messages ? messages.map(mass => 
              
              <div className='room__massanges__link'>
           <div className="room__massanges__link__message">{mass.message}</div>
           <span className="room__massanges__link__user-name">{mass.userName}</span>
         </div>)
         :null}
      </Scrollbars>
          
            </ul>
            <div className="room__send__massenge">
              <textarea className="room__send__input" value={message} onChange={e => setMessage(e.target.value)}/>
              <div className="room__send__button " onClick={() => sendMessage(message)}><span>Отправить</span></div>
            </div>
          </div>
            </div>
          
          </div>
          
        </div>
    )
}
export default Room;