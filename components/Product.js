import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import firebase from 'firebase';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      storeName: '',
    }
    this.getImage();    
  }
  
  componentDidMount() {
    this.getPublisherInfo();
  }

  // get publisher information
  getPublisherInfo() {
    firebase.database().ref('users/' + this.props.user).once('value', (data, err)=> {
      const storeName = data.val().name;
      if(storeName) {
        this.setState({storeName})
      }
    })
  }

  // Get the image of the prouct
  async getImage() {
    if(this.props.hasImage) {
      let url = 'the url';
      firebase.storage().ref().child('products-images/' + this.props.id).getDownloadURL().then(function(_url) {
        let url1 = _url;
        return url1;
      }).then(url2=> {
        this.setState({img: url2})
      })
    }
  }

  async forwardMessage() {
    console.log('Forwarding');
  }

  async callPublisher() {
    console.log('Calling publisher');
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 5,
          margin: 5,
          padding: 5,
          // flexDirection: 'row'
        }}
      >
        <View style={{padding: 10, borderRadius: 3, backgroundColor: '#fcfcfc'}}>
          <Image 
            style={{width: 50 * this.props.ratio.x , height: 50 * this.props.ratio.y}} 
            source={{uri: this.state.img}}
          />
        </View>

        <View>
          <Text>{this.props.title}</Text>
          <Text style={{color: '#daa520'}}>$ {this.props.value}{' / '} {this.props.quantity}{' '}{this.props.unity}</Text>
          <Text>{this.state.storeName !== '' ? 'Estabelecimento: ' + this.state.storeName : ''}</Text>
          <Text style={{color: '#888', fontSize: 12}}>
            {
              new Date(this.props.date).getDate() +'.'+
              (new Date(this.props.date).getMonth() + 1) + '.'+
              new Date(this.props.date).getFullYear()
            }
          </Text>
        </View>
       
      </View>
    );
  }
}