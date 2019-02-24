import React, { Component } from 'react'
import { Text, ScrollView, Image } from 'react-native'
import { List, ListItem, Body, View } from 'native-base'

import FooterIcon from '../../Components/MyFooter/FooterIcon'
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader'

import { StatsService } from '../../Services/StatsService'

export default class VisitorsScreen extends Component {

  static navigationOptions = {
    tabBarIcon: ({activeTintColor, focused}) =>
      (<FooterIcon activeTintColor={activeTintColor}
                   focused={focused} icon="torsos-all"/>),
    title: 'Visitors'
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
    StatsService.visitors(this.state.url, this.state.code, 1)
      .then(payload => {
        this.setState({
          data: payload,
          loading: false
        })
      })
  }

  render () {
    let __this = this
    return (
      __this.state.loading ? <FullPageLoader/>
        : <ScrollView style={{backgroundColor: '#eae9ef'}}>
          <List>
            {
              __this.state.data.map((x, i) => {
                return (
                  <ListItem key={'visitor_' + i} style={styles.row}>
                    <Body>
                    <View style={styles.inner}>
                      <View style={styles.left}>
                        <View style={styles.leftTop}>
                          <Image
                            style={{width: 16, height: 16, marginRight: 5}}
                            source={{uri: x.location.flag}}
                          />
                          <Image
                            style={{width: 16, height: 16, marginRight: 5}}
                            source={{uri: x.agent.icon}}
                          />
                          <Text>{x.IP}</Text>
                        </View>
                        <View style={styles.leftTop}>
                          <Text style={styles.referred}>{x.referred}</Text>
                        </View>
                      </View>
                      <View style={styles.right}>
                        <Text style={styles.time}>{x.time}</Text>
                      </View>
                    </View>
                    </Body>
                  </ListItem>

                )
              })
            }
          </List>
        </ScrollView>
    )
  }
}

let styles = {
  row: {
    backgroundColor: 'transparent'
  },
  inner: {
    flex: 1,
    flexDirection: 'row'
  },
  left: {
    flex: 5
  },
  leftTop: {
    flex: 1,
    flexDirection: 'row'
  },
  leftBot: {},
  referred: {
    opacity: .75,
    marginTop: 3
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  time: {
    fontSize: 16,
  }
}