import React, { Component } from 'react'
import { View, Platform, DrawerLayoutAndroid } from 'react-native'

import { Container, Content, getTheme, StyleProvider, Drawer, Button } from 'native-base'
import MyHeader from '../../Components/MyHeader/MyHeader'
import SideBar from '../../Components/SideBar/SideBar'

import material from '../../native-base-theme/variables/material'

export default class MyScreen extends Component {

  state = {}

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  closeDrawer = () => {
    if (Platform.OS === 'ios') {
      this.drawer._root.close()
    } else if (Platform.OS === 'android') {
      this.refs['DRAWER'] ? this.refs['DRAWER'].closeDrawer() : true
    }
  }

  openDrawer = () => {
    if (Platform.OS === 'ios') {
      this.drawer._root.open()
    } else if (Platform.OS === 'android') {
      this.refs['DRAWER'] ? this.refs['DRAWER'].openDrawer() : true
    }
  }

  render () {
    let __this = this
    return (
      <StyleProvider style={getTheme(material)}>
        {
          (__this.props.headerType == 'drawer' || __this.props.headerType == 'backDrawer') && Platform.OS === 'ios' ?
            <Drawer
              ref={(ref) => {
                __this.drawer = ref
              }}
              content={<SideBar
                navigation={__this.props.navigation}
                closeDrawer={__this.closeDrawer}/>}
              onClose={() => __this.closeDrawer()}
              side="right"
              panOpenMask={.15}
            >
              <Container style={{backgroundColor: '#FFF'}}>
                <MyHeader
                  type={__this.props.headerType}
                  title={__this.props.title}
                  backTitle={__this.props.backTitle}
                  openDrawer={__this.openDrawer}
                  closeDrawer={__this.closeDrawer}
                  shadow={true}
                  navigation={__this.props.navigation}
                  transparent={false}
                />
                {__this.props.children}
              </Container>
            </Drawer>
            : (__this.props.headerType == 'drawer' || __this.props.headerType == 'backDrawer') && Platform.OS === 'android' ?
            <DrawerLayoutAndroid
              drawerWidth={300}
              ref={'DRAWER'}
              drawerPosition={DrawerLayoutAndroid.positions.Right}
              renderNavigationView={() => {
                return (<View style={{flex: 1, backgroundColor: '#fff'}}>
                  <SideBar
                    navigation={__this.props.navigation}
                    closeDrawer={__this.closeDrawer}
                  />
                </View>)
              }}>
              <Container style={{backgroundColor: '#fff'}}>
                <MyHeader
                  type={__this.props.headerType}
                  openDrawer={__this.openDrawer}
                  closeDrawer={__this.closeDrawer}
                  shadow={__this.props.headerShadow}
                  navigation={__this.props.navigation}
                  title={__this.props.title}
                  backTitle={__this.props.backTitle}
                  transparent={false}
                />
                {__this.props.children}
              </Container>
            </DrawerLayoutAndroid>
            : <Container style={{backgroundColor: '#FFF'}}>
              <MyHeader
                type={__this.props.headerType}
                openDrawer={__this.openDrawer}
                closeDrawer={__this.closeDrawer}
                shadow={__this.props.headerShadow}
                navigation={__this.props.navigation}
                title={__this.props.title}
                backTitle={__this.props.backTitle}
                transparent={false}
              />
              {__this.props.children}
            </Container>
        }

      </StyleProvider>
    )
  }
}
