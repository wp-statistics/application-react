import React, { Component } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { Text, Button, Item, Input, Icon, Card, CardItem, Body } from 'native-base'
import _ from 'lodash'

import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader'
import MyScreen from '../../Components/MyScreen/MyScreen'
import StatsNavigator from './StatsNavigator'

let {height, width} = Dimensions.get('window')

export default class StatsScreen extends Component {

  state = {
    loading: false,
  }

  constructor (props) {
    super(props)

  }

  componentWillMount () {
    this.props.screenProps.pushNavStack('StatsScreen')
    this.setState({params: this.props.navigation.state.params})
  }

  componentDidMount () {

  }

  componentWillUnmount () {
    // this.backButtonListener.remove();
    this.props.screenProps.popNavStack()
  }

  render () {
    let __this = this
    return (
      <MyScreen
        headerType={'back'}
        title={'Stats'}
        backTitle={'Websites'}
        headerShadow={true}
        navigation={__this.props.navigation}
      >
        {
          __this.state.loading ? <FullPageLoader/>
            : <StatsNavigator screenProps={{params: __this.state.params}}/>
        }
      </MyScreen>
    )
  }
}
