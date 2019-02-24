import React, {Component} from 'react';
import {View} from 'react-native';

import {Text} from 'native-base';
import material from "../../native-base-theme/variables/material";
import Timer from "../Timer/Timer";


export default class HeaderBox extends Component {

	state = {}


	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}


	render() {
		let __this = this
		return (
			<View style={styles.headerBox}>
				<Text style={__this.props.time ? styles.title : styles.titleFull}>
					{__this.props.title}
				</Text>
				{
					__this.props.time &&
					<View style={styles.timer}>
						{__this.props.time && <Timer time={__this.props.time}/>}
					</View>
				}
			</View>
		);
	}
}

let styles = {
	headerBox: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0, 0, 0, .06)',
		alignItems: 'flex-end',
		paddingHorizontal: 15,
		flexDirection: 'row-reverse'
	},
	title: {
		width: '30%',
		textAlign: 'right',
		fontFamily: 'SABAYekan',
		borderBottomWidth: 3,
		borderBottomColor: material.brandPrimary,
		paddingBottom: 5,
	},
	titleFull: {
		width: '50%',
		textAlign: 'right',
		fontFamily: 'SABAYekan',
		borderBottomWidth: 3,
		borderBottomColor: material.brandPrimary,
		paddingBottom: 5,
	},
	timer: {
		width: '70%',
		paddingBottom: 5
	}
}