import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import {TextInput as TextInputP} from 'react-native-paper';
import {Button as ButtonP} from 'react-native-paper';

import firebase from 'firebase';
// import firebaseConfig from '../modules/firebaseApiKeys';

export default class UpdateNameAvenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      avenue: '',
      tel: ''
    }
  }

  async update() {
    const tokken = this.props.tokken;
    firebase.database().ref('users/' + tokken).update({
      name: this.state.name,
      avenue: this.state.avenue,
      tel: this.state.tel
    });
  }

  render() {
    return (
      <View
        style={{
          padding: 5
        }}
      >
        <TextInputP
          label="Nome do estabelecimento"
          value={this.state.name}
          onChangeText={(text)=> {
            this.setState({name: text})
          }}
          mode='outlined'
          style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
        />
        <TextInputP
          label="Bairro ou Avenida"
          value={this.state.avenue}
          onChangeText={(text)=> {
            this.setState({avenue: text})
          }}
          mode='outlined'
          style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
        />

        <TextInputP
          label="Telefone"
          value={this.state.tel}
          onChangeText={(text)=> {
            this.setState({tel: text})
          }}
          mode='outlined'
          style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
        />

        <ButtonP mode='contained'
          onPress={()=> this.update()}
          style={{marginTop: 10, fontFamily: 'Main-Font'}}
        >
          Actualizar
        </ButtonP>
      </View>
    );
  }
}