/*
 * action types
 */

export const CHANGE_STATE = 'CHANGE_STATE'

/*
 * action creators
 */

export function changeState(params) {
	return {type: CHANGE_STATE, params}
}

/****Dont foget reducers***/