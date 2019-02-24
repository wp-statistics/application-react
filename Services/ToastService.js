import React from 'react'
import {Toast} from 'native-base';
import {ToastAndroid} from 'react-native';

export const ToastService = {
	show(type, text, duration) {
		Toast.show({
			supportedOrientations: ['portrait', 'landscape'],
			text: text,
			position: 'bottom',
			type: type,
			duration: duration || 3000,
		})
		// ToastAndroid.show(text, ToastAndroid.SHORT);
	}
}