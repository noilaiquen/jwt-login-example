import React, { Component } from 'react';
import {
   Text, 
   View,
   Button
} from 'react-native';
import { getAuthState, removeAuthState } from '../../storage/Auth';

export default class App extends Component {
   state = {
      token: null,
      info: null
   };

   componentDidMount() {
      this.getInfo();
   }

   getInfo = async () => {
      const info = await getAuthState();
      this.setState({
         info: info.info,
         token: info.token
      });
   }

   onSignOut = () => {
      removeAuthState();
      this.props.navigation.navigate('Unauthorized');
   }

   render() {
      const { navigation } = this.props;
      const { token, info } = this.state;

      return (
         <View style={styles.container}>
            <Text style={styles.welcome}>You are logged in!</Text>
            <Text>{token}</Text>
            <Button
               title="Sign out"
               onPress={this.onSignOut.bind(this)}
            />
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   welcome: {
      fontSize: 20,
      color: '#D32F2F'
   }
};
