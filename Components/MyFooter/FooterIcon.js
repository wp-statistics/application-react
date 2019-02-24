import React, { Component } from 'react'
import { Icon } from 'native-base'
import material from '../../native-base-theme/variables/material'
///node_modules/native-base/src/basic/Icon/NBIcons.json
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'

export default class FooterIcon extends Component {
  render () {
    let color = this.props.focused === true ? material.brandPrimary : '#6b6b6b'
    return (
      <FoundationIcon
        name={this.props.icon} size={28} color={color}/>
    )
  }
}

