import React from 'react';
import {useSelector} from 'react-redux'
import JoinRoom from './componets/joinRoom';
import Room from './componets/room';
import './App.css';

const App = () => {
  const isAuth = useSelector(state => state.isAuth);
  return (
    <div className="app">
      {!isAuth ? <JoinRoom ></JoinRoom>: <Room ></Room>}
    </div>
  );
}

export default App;
