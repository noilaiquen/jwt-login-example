import { createSwitchNavigator } from 'react-navigation';
import SignIn from '../screens/unauthorized/SignIn';
import Home from '../screens/authorized/Home';

const RootNaivgator = isLoggedIn => (
   createSwitchNavigator({
      Unauthorized: {
         screen: SignIn
      },
      Authorized: {
         screen: Home
      }
   }, {
      initialRouteName: isLoggedIn ? 'Authorized' : 'Unauthorized'
   })
);

export default RootNaivgator;