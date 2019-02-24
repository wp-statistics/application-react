import { NavigationActions } from 'react-navigation'

export const NavigationService = {
  reset (navigation, screen, params) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: screen, params: params})
      ]
    })
    navigation.dispatch(resetAction)
  },
  go (navigation, screen, params) {
    const navigateAction = NavigationActions.navigate({
      routeName: screen,
      params: params
    })
    navigation.dispatch(navigateAction)
  },
  back (navigation) {
    const backAction = NavigationActions.back()
    navigation.dispatch(backAction)

  }
}