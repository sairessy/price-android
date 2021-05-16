import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

const screen = {
  width: new Dimensions.get('window').width,
  height: new Dimensions.get('window').height
}

export default class UpdateProfilePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: ''
    }
  }

  update = async ()=> {
    const accepted = ['png', 'jpg', 'jpeg'];

    const result = await ImagePicker.launchImageLibraryAsync();
    if(!result.cancelled) {
      const uri = result.uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const ext = blob.type.split('/')[1];
      if(!accepted.includes(ext)) {
        Alert.alert('O ficheiro que carregou não é suportado!');
        return;
      } else {
        this.setState({uri});
        // uploadImage
      }
    }
  }

  render() {
    return (
      <View
        style={{
          width: screen.width,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          marginBottom: 20
      }}
      >
        <TouchableOpacity
          onPress={()=>{
            this.update()
          }}
        >
          <Image 
            source={
              this.state.uri === '' ? 
              require('../assets/img/user.svg') :
              {uri: this.state.uri}
            }
            style={{
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 100,
              width: 70,
              height: 70,
              backgroundColor: '#eee'
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}