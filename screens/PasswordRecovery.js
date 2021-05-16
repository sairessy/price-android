import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Dimensions, Alert, Button } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import {Button as ButtonP} from 'react-native-paper';
import {TextInput as TextInputP} from 'react-native-paper';

const screen = {
  width: new Dimensions.get('window').width,
  height: new Dimensions.get('window').height
}

export default class RecoveryPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 5,
          position: 'absolute',
          zIndex: 10,
          top: 0,
          left: 0,
          width: screen.width,
          height: screen.height,
          display: this.props.show ? 'flex' : 'none'
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#fff',
            width: screen.width,
            height: screen.height,
          }}
        >
          <Image source={require('../assets/img/banner.png')} 
            style={{
              width: screen.width, 
              height: screen.height * 0.35,
              display: 'none'
            }} 
          />
            <View
              style={{
                position: 'absolute', 
                top: 50,
                flexDirection: 'row',
                flex: 1,
                width: screen.width,
                justifyContent: 'center'
              }}
            >
              <Text style={{fontSize: 32, fontFamily: 'Title-Font'}}>Price</Text>
            </View>
            <View style={{padding: 5, position: 'absolute', top: 130, width: screen.width}}>
              <TextInputP
                label="Email"
                value={this.state.email}
                onChangeText={(text)=> {this.setState({email: text})}}
                mode='outlined'
                style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 10}}
              />

              <ButtonP mode='contained'
                style={{fontFamily: 'Main-Font'}}
                 onPress={ async ()=> {
                  // Send email and password
                  console.log(this.state.email);
                  Alert.alert('Enviamos a senha para o seu email!');
                }}
              >
                Recuperar
              </ButtonP>
              
              {this.props.btn}
        </View>
      </View>
      </View>
    );
  }
}