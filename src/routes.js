import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Filter, {navigationOptions} from './pages/Filter';
import New from './pages/New';

export default createAppContainer(
  createStackNavigator(
    {
      Filter: {
        screen: Filter,
        navigationOptions: navigationOptions,
      },
      New: {
        screen: New,
      },
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitle: 'Art da Pizza',
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);
