import { TabNavigator } from 'react-navigation'

import material from '../../native-base-theme/variables/material'

import VisitorsScreen from './VisitorsScreen'
import SummaryScreen from './SummaryScreen'
import SearchScreen from './SearchScreen'

const StatsNavigator = TabNavigator({
  VisitorsScreen: {screen: VisitorsScreen},
  SummaryScreen: {screen: SummaryScreen},
  SearchScreen: {screen: SearchScreen}
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  lazy: true,
  initialRouteName: 'SummaryScreen',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    inactiveTintColor: "#6b6b6b",
    activeTintColor: material.brandPrimary,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#FFF',
      height: material.footerHeight
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    }
  },
  backBehavior: 'none',
})

export default StatsNavigator