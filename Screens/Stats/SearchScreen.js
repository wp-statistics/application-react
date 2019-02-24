import React, { Component } from 'react'
import { Image, Text, View, ScrollView } from 'react-native'

import FooterIcon from '../../Components/MyFooter/FooterIcon'
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader'
import material from '../../native-base-theme/variables/material'

import { StatsService } from '../../Services/StatsService'
import LineChartSearch from '../../Components/LineChartSearch/LineChartSearch'

export default class SearchScreen extends Component {

  static navigationOptions = {
    tabBarIcon: ({activeTintColor, focused}) =>
      (<FooterIcon activeTintColor={activeTintColor}
                   focused={focused} icon="magnifying-glass"/>),
    title: 'Search Engines'
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
    promises.push(StatsService.search(this.state.url, this.state.code))
    promises.push(StatsService.referrers(this.state.url, this.state.code))
    Promise.all(promises)
      .then(payload => {
        this.setState({
          data: payload[0][0],
          referrers: payload[1],
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
              {__this.state.data.total}
            </Text>
            <Text style={{fontSize: 16}}>Total</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.col1}></View>
              <View style={styles.col2}>
                <Text style={styles.title}>Today</Text>
              </View>
              <View style={styles.col3}>
                <Text style={styles.title}>Yesterday</Text>
              </View>
            </View>
            {
              __this.state.data.search_engine.map(x => {
                return (
                  <View style={styles.row} key={'row_' + x.name}>
                    <View style={styles.col1}>
                      <Image
                        style={{width: 16, height: 16}}
                        source={{uri: x.icon}}
                      />
                      <Text style={styles.titleL}>{x.name}</Text>
                    </View>
                    <View style={styles.col2}>
                      <Text style={styles.txt}>
                        {x.today}
                      </Text>
                    </View>
                    <View style={styles.col3}>
                      <Text style={styles.txt}>
                        {x.yesterday}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <LineChartSearch data={__this.state.referrers}/>
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
    flex: 3,
    flexDirection: 'row'
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
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 15,
    opacity: .75,
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
    color: material.brandPrimary
  }
}