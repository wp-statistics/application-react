import React, { Component } from 'react'
import { View } from 'react-native'

import { Text } from 'native-base'
import PureChart from 'react-native-pure-chart'

export default class LineChartSearch extends Component {

  state = {}

  constructor (props) {
    super(props)
    let refs = []

    props.data.map(x => {
      refs.push({x: x.date, y: x.referrer})
    })

    let sampleData = [
      {
        seriesName: 'series1',
        data: refs,
        color: '#5a9df8'
      }
    ]

    this.state = {
      data: sampleData
    }
  }

  componentDidMount () {
  }

  render () {
    let __this = this

    return (
      <View style={{marginTop: 30, marginBottom: 30}}>
        {__this.state.data && <PureChart data={__this.state.data} type='line' height={120}/>}
        <View style={{flexDirection: 'row', marginTop: 10, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#5a9df8', marginLeft: 7}}>Referrer</Text>
        </View>
      </View>
    )
  }
}
