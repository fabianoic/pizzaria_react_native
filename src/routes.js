import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Filter from './pages/Filter';
import New from './pages/New';
import ProductFilter from './pages/ProductFilter';

export default createAppContainer(
  createStackNavigator(
    {
      Filter,
      New: {
        screen: New,
      },
      ProductFilter,
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
