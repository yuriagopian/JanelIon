import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


 
import LoginScreen from './src/pages/LoginScreen'
import ComponentesPage from './src/pages/ComponentesPage';



const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
    'Main' :{
        screen : ComponentesPage,

    },

 }, {
    defaultNavigationOptions:{
      title : 'Janel On',
      headerTintColor: '#ffff',
      headerStyle :{
        backgroundColor: '#6ca2f7',
        borderBottomWidth: 1,
        borderBottomColor: '#c5c5c5',


      },
      headerTitleStyle:{
        color: '#ffff',
        fontSize:30,


      }
    }
  
});
 
const AppContainer = createAppContainer(AppNavigator);
 
export default AppContainer;