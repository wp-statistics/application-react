import React, { Component } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { Text, List, ListItem, Button, Input } from 'native-base'
import SplashScreen from 'react-native-splash-screen'

import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader'
import MyScreen from '../../Components/MyScreen/MyScreen'
import { NavigationService } from '../../Services/NavigationService'
import { StorageService } from '../../Services/StorageService'
import { WebsiteService } from '../../Services/WebsiteService'

let {height, width} = Dimensions.get('window')

export default class HomeScreen extends Component {

  state = {
    loading: true,
  }

  constructor (props) {
    super(props)
    this.add = this.add.bind(this)
    this.goToStats = this.goToStats.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentWillMount () {
    this.props.screenProps.pushNavStack('HomeScreen')
    this.setState({params: this.props.navigation.state.params})
  }

  async componentDidMount () {
    this.setState({
      websites: await StorageService.get('websites') || [],
      loading: false
    })
    SplashScreen.hide()
  }

  componentWillUnmount () {
    // this.backButtonListener.remove();
    this.props.screenProps.popNavStack()
  }

  add () {
    NavigationService.go(this.props.navigation, 'AddScreen', {})
  }

  goToStats (site) {
    NavigationService.go(this.props.navigation, 'StatsScreen', site)
  }

  async remove (site) {
    let websites = await WebsiteService.remove(site)
    this.setState({
      websites: websites,
    })
  }

  render () {
    let __this = this
    return (
      <MyScreen
        headerType={'title'}
        title={'Websites'}
        headerShadow={true}
        navigation={__this.props.navigation}
      >
        {
          __this.state.loading ? <FullPageLoader/>
            : <ScrollView style={{backgroundColor: '#eae9ef'}}>
              <List>
                {
                  __this.state.websites.map((site, i) => {
                    return (
                      <ListItem key={'site_' + i}
                                onPress={() => {__this.goToStats(site)}}
                                style={styles.row}>
                        <View style={{flex: 1}}>
                          <Text style={{textAlign: 'left', width: '100%'}}>
                            {site.url}
                          </Text>
                        </View>
                        <View>
                          <Button danger small
                                  onPress={() => {__this.remove(site)}}>
                            <Text>{'Remove'}</Text>
                          </Button>
                        </View>
                      </ListItem>
                    )
                  })
                }
              </List>
              <View style={{marginTop: 30, marginHorizontal: 15}}>
                <Button primary full rounded onPress={__this.add}>
                  <Text>Add Website</Text>
                </Button>
              </View>
            </ScrollView>
        }
      </MyScreen>
    )
  }
}

let styles = {
  row: {
    backgroundColor: 'transparent'
  }
}