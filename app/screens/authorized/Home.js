import React, { Component } from 'react';
import {
   Text, 
   View,
   StatusBar
} from 'react-native';

export default class App extends Component {
   render() {
      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.welcome}>You are logged in!</Text>
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'

   }
};
