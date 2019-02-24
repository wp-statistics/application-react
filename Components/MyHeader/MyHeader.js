import React, { Component } from 'react'
import { StatusBar, View, TouchableWithoutFeedback } from 'react-native'
import { Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base'
import { NavigationService } from '../../Services/NavigationService'
import Ripple from 'react-native-material-ripple'
import EntypoIcon from 'react-native-vector-icons/dist/Entypo'

import store from '../../Providers/store'

import { StateService } from '../../Services/StateService'
import material from '../../native-base-theme/variables/material'

export default class MyHeader extends Component {

  state = {
    cartCount: StateService.get('cartCount') || 0
  }

  constructor (props) {
    super(props)
    this.back = this.back.bind(this)
    this.goToCartScreen = this.goToCartScreen.bind(this)
  }

  componentWillMount () {
    store.subscribe(() => {
      this.setState({
        cartCount: StateService.get('cartCount')
      })
    })
  }

  back () {
    NavigationService.back(this.props.navigation)
  }

  goToCartScreen () {
    NavigationService.go(this.props.navigation, 'CartScreen', {})
  }

  render () {
    return (
      <Header noShadow={!this.props.shadow}>
        <StatusBar hidden={false}/>
        <Left style={{flexDirection: 'row'}}>

        </Left>
        <Body>
        </Body>
        {(() => {
          if (this.props.type == 'title') {
            return (
              <Title style={{
                color: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                lineHeight: material.toolbarHeight
              }}>
                {this.props.title}
              </Title>
            )
          }
        })()}
        {(() => {
          if (this.props.type == 'drawer') {
            return (
              <Right>
                <Title
                  style={{paddingRight: 0, fontFamily: 'SABAYekan', top: -6, color: '#000'}}>{this.props.title}</Title>
                <Button transparent onPress={this.props.openDrawer}>
                  <Icon name='md-menu' style={{color: '#fff'}}/>
                </Button>
              </Right>
            )
          }
        })()}
        {(() => {
          if (this.props.type == 'back' || this.props.type == 'backDrawer') {
            return (
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  style={{width: '25%', height: '100%', flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {NavigationService.back(this.props.navigation)}}
                >
                  <View style={{width: '25%', height: '100%', flexDirection: 'row', alignItems: 'center'}}>
                    <EntypoIcon name='chevron-thin-left' size={22} color={'#097de4'}/>
                    <Text style={{marginLeft: 10, color: '#097de4'}}>
                      {this.props.backTitle}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Title style={{
                  color: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50%',
                  height: '100%',
                  lineHeight: material.toolbarHeight
                }}>
                  {this.props.title}
                </Title>
                <View style={{width: '25%', height: '100%'}}>
                </View>
              </View>
            )
          }
        })()}
      </Header>
    )
  }
}