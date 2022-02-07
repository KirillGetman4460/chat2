import { createStore } from 'redux'

const defaultState = { isAuth:false, idRoom:null, userName:'',users:null }

const reducer = (state = defaultState , action) =>{
    switch(action.type){
        case 'IS_AUTH':
            return{...state, isAuth: action.payload}
        case"SET_IDROOM":
            return{...state, idRoom: action.payload}
        case"SET_USERNAME":
            return{...state, userName: action.payload}
        case "SET_USERS":
            return{...state, users: action.payload}
        default:
            return state
    }
}
let store = createStore(reducer)

export default store;