import { StackNavigator } from 'react-navigation'
import HomeScreen from './Screens/Home/HomeScreen'
import AddScreen from './Screens/AddScreen/AddScreen'
import StatsScreen from './Screens/Stats/StatsScreen'

const transitionConfig = () => ({
  screenInterpolator: sceneProps => {
    const {layout, position, scene} = sceneProps
    const {index} = scene
    const width = layout.initWidth

    return {
      opacity: position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
      }),
      transform: [{
        translateX: position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [-width, 0, width],
        }),
      }]
    }
  },
  headerTitleInterpolator: sceneProps => {
    const {layout, position, scene} = sceneProps
    const {index} = scene

    return {
      opacity: position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
      }),
      transform: [{
        translateX: position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [-50, 0, 50],
        }),
      }]
    }
  },
})

const AppNavigator = StackNavigator({
  HomeScreen: {screen: HomeScreen},
  AddScreen: {screen: AddScreen},
  StatsScreen: {screen: StatsScreen},
}, {
  headerMode: 'none',
  transitionConfig,
})

export default AppNavigator