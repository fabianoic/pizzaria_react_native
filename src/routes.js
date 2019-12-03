import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Filter, {navigationOptionsFilterScreen} from './pages/Filter';
import Info from './pages/Info';
import Products from './pages/Products';
import Login from './pages/Login';
import ItemProduct, {
  navigationOptionsItemProductScreen,
} from './pages/ItemProduct';

const PedidoTabs = createMaterialBottomTabNavigator(
  {
    Itens: {
      screen: ItemProduct,
    },
    Info: {
      screen: Info,
    },
  },

  {
    initialRouteName: 'Itens',
    barStyle: {
      backgroundColor: '#353583',
      alignItems: 'center',
      alignContent: 'center',
    },
    activeColor: 'white',
  },
);

export default createAppContainer(
  createStackNavigator(
    {
      Filter: {
        screen: Filter,
        navigationOptions: navigationOptionsFilterScreen,
      },
      Login,
      Info: {
        screen: PedidoTabs,
        navigationOptions: navigationOptionsItemProductScreen,
      },
      Products,
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
