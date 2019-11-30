import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Filter from './pages/Filter';
import New from './pages/New';
import ProductFilter from './pages/ProductFilter';

const PedidoTabs = createBottomTabNavigator({
  Itens: {
    screen: ProductFilter,
    navigationOptions: {
      tabBarLabel: 'Itens',
    },
  },
  Info: {
    screen: New,
    navigationOptions: {
      tabBarLabel: 'Info',
    },
  },
});

export default createAppContainer(
  createStackNavigator(
    {
      Filter,
      New: {
        screen: PedidoTabs,
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
