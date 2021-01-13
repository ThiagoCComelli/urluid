import {userReducer,modalReducer} from './reducers'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    user: userReducer,
    modal: modalReducer
})

export default allReducers