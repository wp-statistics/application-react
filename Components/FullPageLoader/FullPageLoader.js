import React, { Component } from 'react'
import { View } from 'react-native'
import { Spinner } from 'native-base'

import material from '../../native-base-theme/variables/material'

export default class FullPageLoader extends Component {

  state = {}

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    let __this = this
    return (
      <View style={{flex: 1, backgroundColor: '#eae9ef', justifyContent: 'center'}}>
        <Spinner color={material.brandPrimary}/>
      </View>
    )
  }
}
