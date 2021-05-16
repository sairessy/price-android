import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import firebase from 'firebase';

import {TextInput as TextInputP} from 'react-native-paper';
import {Button as ButtonP} from 'react-native-paper';

export default class ConfigPrivacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPass: '',
      newPass: '',
      confirmNewPass: '',
    }
  }

  async changePass() {
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
        {/* <UpdateProfile tokken={this.props.tokken} show={this.props.show}/> */}
        <Text style={{margin: 5, color: '#999', fontFamily: 'Main-font'}}>Alterar senha</Text>
          <TextInputP
            label="Senha actual"
            value={this.state.currentPass}
            onChangeText={(text)=> {
              this.setState({currentPass: text})
            }}
            mode='outlined'
            style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
          />

          <TextInputP
            label="Nova senha"
            value={this.state.newPass}
            onChangeText={(text)=> {
              this.setState({newPass: text})
            }}
            mode='outlined'
            style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
          />

          <TextInputP
            label="Confirmar nova senha"
            value={this.state.confirmNewPass}
            onChangeText={(text)=> {
              this.setState({confirmNewPass: text})
            }}
            mode='outlined'
            style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
          />

          <ButtonP
            mode='contained'
            style={{marginTop: 10, fontFamily: 'Main-Font'}}
            onPress={()=> this.changePass()}
          >
            Alterar
          </ButtonP>

          {this.props.endSessionBtn}
      </View>
    );
  }
}