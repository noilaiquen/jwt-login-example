import { createSwitchNavigator } from 'react-navigation';
import SignIn from '../screens/unauthorized/SignIn';
import Home from '../screens/authorized/Home';

const RootNaivgator = createSwitchNavigator({
   Unauthorized: {
      screen: SignIn
   },
   Authorized: {
      screen: Home
   }
}, {
   initialRouteName: 'Unauthorized'
});

export default RootNaivgator;