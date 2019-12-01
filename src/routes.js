import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import Filter from './pages/Filter';
import Info from './pages/Info';
import Products from './pages/Products';
import ItemProduct from './pages/ItemProduct';

const PedidoTabs = createMaterialBottomTabNavigator(
  {
    Itens: {
      screen: ItemProduct,
      navigationOptions: {
        tabBarLabel: 'Itens',
      },
    },
    Info: {
      screen: Info,
      navigationOptions: {
        tabBarLabel: 'Info',
      },
    },
  },
  {initialRouteName: 'Itens', barStyle: {backgroundColor: '#4682B4'}},
);

export default createAppContainer(
  createStackNavigator(
    {
      Filter,
      Info: {
        screen: PedidoTabs,
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
