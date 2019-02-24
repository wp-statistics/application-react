import React, {Component} from 'react';

import {Container, Content, getTheme, StyleProvider, Drawer, Button} from 'native-base';
import MyHeader from '../../Components/MyHeader/MyHeader'


export default class Inner extends Component {

	state = {}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}



	render() {
		let __this = this
		return (
			<Container>
				<MyHeader
					type={__this.props.headerType}
					openDrawer={__this.props.openDrawer}
					closeDrawer={__this.props.closeDrawer}
					shadow={true}
					navigation={__this.props.navigation}
					title={__this.state.title}
					transparent={false}
				/>
				{__this.props.children}
			</Container>
		);
	}
}
