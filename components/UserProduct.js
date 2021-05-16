import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import firebase from 'firebase';

export default class UserProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async delete(id) {
    firebase.database().ref('products').on('value', (_data, err)=> {
      const data = _data.val();
      const keys = Object.keys(data);

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if(k === id) {
          firebase.database().ref('products/' + id).remove();
        }
      }
    });
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 5,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#fff' || '#ddd',
          marginBottom: 5
        }}
      >
        <Text>{this.props.title}</Text>
        <Ionicons.Button 
          name="trash" 
          size={20} 
          color="#da7e99" 
          backgroundColor='#fcfcfc' 
          iconStyle={{margin: 0}}
          
          onPress={()=> {
            this.delete(this.props.id);
          }}
        />
      </View>
    );
  }
}