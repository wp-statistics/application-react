import {combineReducers} from 'redux'
import {CHANGE_STATE} from './actions'
import _ from 'lodash'

function myState(state = [], action) {
	switch (action.type) {
		case CHANGE_STATE:
			let myState = state
			_.each(action.params, (v, k) => {
				myState[k] = v
			})
			return myState
		default:
			return state
	}
}

const myReducer = combineReducers({
	myState
})

export default myReducer