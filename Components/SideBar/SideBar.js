import React, { Component } from 'react';
import { Image, View, BackAndroid, Text } from 'react-native';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import material from '../../native-base-theme/variables/material';
import Ripple from 'react-native-material-ripple';

import appConfig from '../../config'
import _ from 'lodash'

import { NavigationService } from '../../Services/NavigationService'

export default class SideBar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			user: {},
			avatar: {},
		};
	}


	componentWillMount () {

	}

	goToScreen (screen, params) {
		let __this = this
		NavigationService.go(__this.props.navigation, screen, params)
		__this.props.closeDrawer()
	}

	resetScreen (screen, params) {
		let __this = this
		NavigationService.reset(__this.props.navigation, screen, params)
		__this.props.closeDrawer()
	}

	render () {
		let __this = this
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}></View>
		);
	}
}


let headHeight = 200
