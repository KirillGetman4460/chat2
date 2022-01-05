import React from 'react';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import socket from "../socket"
const JoinRoom = () => {
    const idRoom = useSelector(state => state.idRoom)

    const userName = useSelector(state => state.userName)

    const dispatch = useDispatch()

    const connect = async(idRoom,userName) =>{
        try {
            if(idRoom && userName){
                await axios.post('http://localhost:8080/rooms',{idRoom,userName})
                socket.emit('ROOM:JOIN', {idRoom,userName});
                socket.on("ROOM:JOINED",data => dispatch({type:'SET_USERS',payload:data}))
                dispatch({type:'IS_AUTH',payload:true})
                return
            }
        } catch (error) {
            console.log(error);
        }      
    }

    return (
        <div className="join-block">
            <input type="text" value={idRoom} onChange={e => dispatch({type:'SET_IDROOM',payload:e.target.value})} placeholder="Room ID"/>
            <input type="text" value={userName} onChange={e => dispatch({type:'SET_USERNAME',payload:e.target.value})} placeholder="Ваше имя"/>
            <button onClick={() => connect(idRoom,userName)}>войти</button>
        </div>
    )
}
export default JoinRoom;