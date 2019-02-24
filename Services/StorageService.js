import React from 'react'
import {AsyncStorage} from 'react-native'


export const StorageService = {
	async set(key, value) {
		let newVal = JSON.stringify({type: typeof value, data: value});
		try {
			await AsyncStorage.setItem(key, newVal);
		} catch (error) {
			console.log(error)
		}
	},
	get(key) {
		return new Promise(
			(resolve, reject) => {
				AsyncStorage.getItem(key)
					.then(
						resp => {
							let value = JSON.parse(resp).data
							resolve(value);
						})
					.catch(
						err => {
							resolve(false);
						})
			})
	},
	remove(key) {
		AsyncStorage.removeItem(key)
	}
}
