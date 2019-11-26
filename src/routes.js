import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Filter from './pages/Filter';
import New from './pages/New';

export default createAppContainer(
  createStackNavigator(
    {
      Filter,
      New,
    },
    {
      initialRouteName: 'New',
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitle: 'Art da Pizza',
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);
