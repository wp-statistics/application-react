import React from 'react'

import {changeState} from '../Providers/actions'
import store from '../Providers/store'

export const StateService = {
	set(state) {
		store.dispatch(changeState(state))
	},
	get(key) {
		return store.getState().myState[key]
	}
}