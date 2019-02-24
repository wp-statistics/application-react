import React, { Component } from 'react'
import { View, ScrollView, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native'
import { Text, Button, Item, Input, Icon, Card, CardItem, Body, Toast } from 'native-base'
import _ from 'lodash'

import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader'
import MyScreen from '../../Components/MyScreen/MyScreen'
import { NavigationService } from '../../Services/NavigationService'
import { StorageService } from '../../Services/StorageService'
import { WebsiteService } from '../../Services/WebsiteService'
import { StatsService } from '../../Services/StatsService'

let {height, width} = Dimensions.get('window')

export default class AddScreen extends Component {

  state = {
    loading: false,
  }

  constructor (props) {
    super(props)
    this.add = this.add.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.goToApiSite = this.goToApiSite.bind(this)
  }

  componentWillMount () {
    this.props.screenProps.pushNavStack('AddScreen')
    this.setState({params: this.props.navigation.state.params})
  }

  componentDidMount () {

  }

  componentWillUnmount () {
    // this.backButtonListener.remove();
    this.props.screenProps.popNavStack()
  }

  async add () {
    let result = await WebsiteService.add(StatsService.prepareUrl(this.state.url), this.state.code)
    if (result.status) {
      NavigationService.reset(this.props.navigation, 'HomeScreen', {})
    } else {
      Toast.show({
        text: result.msg,
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000
      })
    }
  }

  handleChange (field, value) {
    this.setState({[field]: value})
  }

  goToApiSite () {
    Linking.openURL('https://wp-statistics.com/downloads/wp-statistics-rest-api/')
  }

  render () {
    let __this = this
    return (
      <MyScreen
        headerType={'back'}
        title={'Add new Website'}
        backTitle={'Websites'}
        headerShadow={true}
        navigation={__this.props.navigation}
      >
        {
          __this.state.loading ? <FullPageLoader/>
            : <ScrollView style={{backgroundColor: '#eae9ef', padding: 15}}>

              <Item style={{marginBottom: 15}}>
                <Icon active name='link'/>
                <Input onChangeText={(value) => __this.handleChange('url', value)} placeholder='Website URL'/>
              </Item>
              <Item>
                <Icon active name='key'/>
                <Input onChangeText={(value) => __this.handleChange('code', value)} placeholder='Auth Code'/>
              </Item>
              <View style={{width: '100%', marginTop: 30}}>
                <Button primary full rounded onPress={__this.add}>
                  <Text>Add</Text>
                </Button>
              </View>
              <View style={{width: '100%', marginTop: 30}}>
                <TouchableWithoutFeedback
                  onPress={__this.goToApiSite}>
                  <Card>
                    <CardItem>
                      <Body>
                      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                        <Icon active name='ios-information-circle-outline' style={{marginRight: 15}}/>
                        <Text style={{fontWeight: 'bold'}}>
                          Information
                        </Text>
                      </View>
                      <Text style={{lineHeight: 26, textAlign: 'justify'}}>
                        Please keep in mind, to connect to the website, the REST API Add-On needs to be in installed on
                        your
                        WordPress.
                      </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableWithoutFeedback>
              </View>
            </ScrollView>
        }
      </MyScreen>
    )
  }
}
