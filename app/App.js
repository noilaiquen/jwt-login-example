import React, { Component } from 'react';
import RootNavigator from './routes/RootNavigtor';
import { getAuthState } from './storage/Auth';

export default class App extends Component {
   state = {
      isLoggedIn: null
   }

   async componentWillMount() {
      const authState = await getAuthState();
      if (authState === null || authState === undefined) {
         this.setState({
            isLoggedIn: false
         });
      } else {
         this.setState({
            isLoggedIn: true
         });
      }
   }

   render() {
      const { isLoggedIn } = this.state;
      if(isLoggedIn !== null) {
         const Screen = RootNavigator(isLoggedIn);
         return <Screen />;
      }
      return null;
   }
}