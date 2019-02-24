import myReducer from './reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'


let store = createStore(myReducer)

export default store