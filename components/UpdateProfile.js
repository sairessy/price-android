import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import UpdateProfilePicture from '../components/UploadProfilePicture';
import UpdateNameAvenue from './UpdateNameAvenue';
import SelectLocation from './SelectLocation';

import firebase from 'firebase';

export default class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPass: '',
      newPass: '',
      confirmNewPass: ''
    }
  }

  async changePassAndEmail() {
    firebase.database().ref('users').once('value', (data, err)=> {
      const users = data.val();
      const tokken = this.props.tokken;
      const pass = users[tokken].pass;
      if(pass !== this.state.currentPass) {
        Alert.alert('A senha actual não está correcta!');
        return;
      }

      if(this.state.newPass === this.state.confirmNewPass) {
        firebase.database().ref('users/' + tokken).update({
          pass: this.state.newPass
        });
        console.log('Senha alterada com sucesso!');
        Alert.alert('Senha alterada com sucesso!');
      } else {
        Alert.alert('As novas senhas não coincidem!');
        console.log('As novas senhas não coincidem!');
      }
    }); 
  }

  render() {
    return (
      <View
        style={{
          padding: 5,
          display: this.props.show ? 'flex' : 'none'
        }}
      >
        <UpdateProfilePicture tokken={this.props.tokken}/>
        <UpdateNameAvenue tokken={this.props.tokken} />
        <SelectLocation />
      </View>
    );
  }
}