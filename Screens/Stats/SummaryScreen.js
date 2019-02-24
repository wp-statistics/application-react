import React, { Component } from 'react'
import { NativeModules, AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native'

import FooterIcon from '../../Components/MyFooter/FooterIcon'
import material from '../../native-base-theme/variables/material'

import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader'
import LineChartSummary from '../../Components/LineChartSummary/LineChartSummary'

import { StatsService } from '../../Services/StatsService'

export default class SummaryScreen extends Component {

  static navigationOptions = {
    tabBarIcon: ({activeTintColor, focused}) =>
      (<FooterIcon activeTintColor={activeTintColor}
                   focused={focused} icon="graph-bar"/>),
    title: 'Summary'
  }

  constructor (props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.state = {
      loading: true,
      url: this.props.screenProps.params.url,
      code: this.props.screenProps.params.code
    }
  }

  componentDidMount () {
    this.getData()
    this.intervalId = setInterval(this.getData, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  getData () {
    let promises = []
    promises.push(StatsService.summary(this.state.url, this.state.code))
    promises.push(StatsService.hits(this.state.url, this.state.code))
    Promise.all(promises)
      .then(payload => {
        this.setState({
          data: payload[0],
          hits: payload[1],
          loading: false
        })
      })
  }

  render () {
    let __this = this
    return (
      __this.state.loading ? <FullPageLoader/>
        : <ScrollView style={{backgroundColor: '#eae9ef', padding: 15}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#14aeee', fontSize: 52}}>
              {__this.state.data.user_online}
            </Text>
            <Text style={{fontSize: 16}}>Online Users</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.col1}></View>
              <View style={styles.col2}>
                <Text style={styles.title}>Visitors</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.title}>Visits</Text>
              </View>
            </View>
            {
              ['Today', 'Yesterday', 'Week', 'Month', 'Year', 'Total'].map(x => {
                return (
                  <View style={styles.row} key={'row_' + x}>
                    <View style={styles.col1}>
                      <Text style={styles.titleL}>{x}</Text>
                    </View>
                    <View style={styles.col2}>
                      <Text style={styles.txt}>
                        {__this.state.data.visitors[x.toLowerCase()]}
                      </Text>
                    </View>
                    <View style={styles.col3}>
                      <Text style={styles.txt}>
                        {__this.state.data.visits[x.toLowerCase()]}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <LineChartSummary data={__this.state.hits}/>
        </ScrollView>
    )
  }
}

let styles = {
  table: {
    marginTop: 30
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 7
  },
  col1: {
    flex: 3
  },
  col2: {
    flex: 4
  },
  col3: {
    flex: 4
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    opacity: .75
  },
  titleL: {
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 15,
    opacity: .75
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
    color: material.brandPrimary
  }
}
