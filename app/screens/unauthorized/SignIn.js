import React, { Component } from 'react';
import {
   TextInput,
   StyleSheet,
   Text,
   View,
   ActivityIndicator,
   Keyboard,
   TouchableOpacity,
   ImageBackground,
   StatusBar,
   Button
} from 'react-native';
import { setAuthState } from '../../storage/Auth';
const image_bg = require('../../../assets/img/bg.jpg');
import { API_URL } from '../../config/constants';

export default class SignIn extends Component {
   state = {
      username: '',
      password: '',
      error: '',
      isLoading: false,
   }

   onSignIn = async () => {
      Keyboard.dismiss();
      this.setState({
         isLoading: true,
         error: ''
      });
      const { username, password } = this.state;
      try {
         const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               username,
               password
            })
         });
         const responseJson = await response.json();

         if (responseJson.status === 1) {
            const { token, payload } = responseJson;
            setAuthState({ token, info: payload });
            this.props.navigation.navigate('Authorized')
         } else {
            this.setState({
               isLoading: false,
               error: responseJson.message
            });
         }
      } catch (error) {
         this.setState({
            isLoading: true,
            error: ' ' + error
         });
      }
   }

   onSignOut = () => {
      this.setState({
         username: '',
         password: '',
         error: '',
         token: '',
         isLoading: false,
         isLoggedIn: false,
         userInfo: null
      })
   }

   render() {
      return (
         <ImageBackground
            source={image_bg}
            blurRadius={5}
            style={styles.container}
         >
            <StatusBar barStyle="light-content" />
            <Text style={styles.welcome}>JWT</Text>
            <View style={styles.errorContainer}>
               <Text style={styles.error}>{this.state.error}</Text>
            </View>
            <View style={styles.form}>
               <TextInput
                  autoCapitalize="none"
                  style={styles.input}
                  value={this.state.username}
                  placeholder="Username"
                  returnKeyType="next"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={text => this.setState({ username: text })}
               />
               <TextInput
                  style={styles.input}
                  value={this.state.password}
                  secureTextEntry
                  returnKeyType="go"
                  placeholder="Password"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={text => this.setState({ password: text })}
                  onSubmitEditing={this.onSignIn.bind(this)}
                  ref={(input) => this.passwordInput = input}
               />

               <TouchableOpacity
                  style={styles.button}
                  onPress={this.onSignIn.bind(this)}
               >
                  {!this.state.isLoading ? (
                     <Text style={styles.textSignIn}>Sign In</Text>
                  ) : (
                        <ActivityIndicator
                           size="small"
                           color="#FFF"
                        />
                     )
                  }
               </TouchableOpacity>
            </View>
         </ImageBackground>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'

   },
   containerLoggedin: {
      alignItems: 'center',
      justifyContent: 'center'
   },
   welcome: {
      fontSize: 40,
      textAlign: 'center',
      color: '#D32F2F',
      margin: 10,
   },
   errorContainer: {
      height: 30,
      justifyContent: 'center',
      alignItems: 'center'
   },
   error: {

      fontSize: 16,
      color: '#D32F2F'
   },
   textLogin: {
      fontSize: 20,
      color: 'green'
   },
   input: {
      width: 300,
      height: 50,
      fontSize: 16,
      padding: 5,
      marginTop: 10,
      fontSize: 16,
      borderColor: '#D32F2F',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#FFF',
      color: '#D32F2F'
   },
   button: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D32F2F',
      borderRadius: 5,
      marginTop: 10
   },
   textSignIn: {
      color: '#FFF',
      fontSize: 16,
   }
});
