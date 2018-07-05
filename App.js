import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator,
    Keyboard
} from 'react-native';

export default class App extends Component {
    state = {
        username: '',
        password: '',
        error: '',
        token: '',
        isLoading: false,
        isLoggedIn: false,
        userInfo: null
    }

    onSignIn = async () => {
        Keyboard.dismiss();
        this.setState({
            isLoading: true,
            error: ''
        });
        const { username, password } = this.state;
        try {
            const response = await fetch('http://10.86.32.140/bcms/api/login', {
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
                this.setState({
                    username: '',
                    password: '',
                    isLoading: false,
                    isLoggedIn: true,
                    token,
                    userInfo: payload
                });
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
            <View style={styles.container}>
                <Text style={styles.welcome}>JWT</Text>
                <Text style={styles.error}>{this.state.error}</Text>
                {!this.state.isLoggedIn ? (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            value={this.state.username}
                            placeholder="Username"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            onChangeText={text => this.setState({ username: text })}
                        />
                        <TextInput
                            style={styles.input}
                            value={this.state.password}
                            secureTextEntry
                            returnKeyType="go"
                            placeholder="Password"
                            onChangeText={text => this.setState({ password: text })}
                            onSubmitEditing={this.onSignIn.bind(this)}
                            ref={(input) => this.passwordInput = input}  
                        />
                        {!this.state.isLoading ? (
                            <Button
                                style={styles.button}
                                title="Sign in"
                                onPress={this.onSignIn.bind(this)}
                            />
                            ) : (
                                <ActivityIndicator
                                    size="small"
                                    color="green"
                                />
                            )
                        }
                    </View>
                ) : (
                    <View style={styles.containerLoggedin}>
                        <Text style={styles.textLogin}>You are logged in!</Text>
                            <Text>{this.state.token}</Text>
                            <Button
                                style={styles.button}
                                title="Sign out"
                                onPress={this.onSignOut.bind(this)}
                            />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    containerLoggedin: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: 'green',
        margin: 10,
    },
    error: {
        fontSize: 14,
        color: 'red'
    },
    textLogin: {
        fontSize: 20,
        color: 'green'
    },
    input: {
        width: 300,
        height: 50,
        fontSize: 16
    },
    button: {
        height: 50
    }
});
