import React, { Component } from 'react'
import { View } from 'react-native'

import { Text } from 'native-base'
import PureChart from 'react-native-pure-chart'

export default class LineChartSummary extends Component {

  state = {}

  constructor (props) {
    super(props)
    let visitors = []
    let visits = []

    props.data.map(x => {
      visitors.push({x: x.date, y: x.visitor})
      visits.push({x: x.date, y: x.visit})
    })

    let sampleData = [
      {
        seriesName: 'series1',
        data: visitors,
        color: '#f86d84'
      },
      {
        seriesName: 'series2',
        data: visits,
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
          <Text style={{color: '#f86d84', marginRight: 7}}>Visitors</Text>
          <Text style={{color: '#5a9df8', marginLeft: 7}}>Visits</Text>
        </View>
      </View>
    )
  }
}
