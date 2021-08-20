import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, StackRouter } from 'react-navigation';
import Home from '../screens/home'
import Search from '../screens/search'

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      headerShown: false,
    }
  }
}



const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
