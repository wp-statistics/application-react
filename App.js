import React, { Component } from 'react'

import { Root } from 'native-base'

import AppNavigator from './AppNavigator'

export default class App extends Component<{}> {

  navStack = []

  constructor (props) {
    super(props)
    this.pushNavStack = this.pushNavStack.bind(this)
    this.popNavStack = this.popNavStack.bind(this)
    this.isExitable = this.isExitable.bind(this)
  }

  componentDidMount () {
    // SplashScreen.hide();
  }

  pushNavStack (screen) {
    this.navStack.push(screen)
  }

  popNavStack () {
    this.navStack.pop()
  }

  isExitable () {
    if (this.navStack.length == 1) {
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <Root>
        <AppNavigator
          screenProps={{pushNavStack: this.pushNavStack, popNavStack: this.popNavStack, isExitable: this.isExitable}}/>
      </Root>
    )
  }
}

