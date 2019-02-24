import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Footer, FooterTab, Button, Icon } from 'native-base'
///node_modules/native-base/src/basic/Icon/NBIcons.json

import { NavigationService } from '../../Services/NavigationService'

export default class MyHeader extends Component {

  state = {}

  go (screen) {
    NavigationService.go(this.props.navigation, screen)
  }

  render () {
    var active = this.props.active
    let __this = this
    return (
      <Footer>
        <FooterTab>
          <Button  {...(active == 0) ? {active: true} : {}}>
            <Icon {...(active == 0) ? {active: true} : {}} name="md-person"/>
          </Button>
          <Button  {...(active == 1) ? {active: true} : {}}  >
            <Icon {...(active == 1) ? {active: true} : {}} name="md-list"/>
          </Button>
          <Button  {...(active == 2) ? {active: true} : {}}
                   onPress={() => {__this.go('HomeScreen')}}>
            <Icon {...(active == 2) ? {active: true} : {}} name="md-home"/>
          </Button>
          <Button  {...(active == 3) ? {active: true} : {}}  >
            <Icon {...(active == 3) ? {active: true} : {}} name="md-create"/>
          </Button>
          <Button  {...(active == 4) ? {active: true} : {}}
                   onPress={() => {__this.go('NotificationsScreen')}}>
            <Icon {...(active == 4) ? {active: true} : {}} name="md-notifications"/>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}