import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Image  } from 'react-native';

export default class Illustration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    console.log(this.props)
  }

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', display: this.props.show ? 'flex' : 'none'}}>
        <Image 
          source={require('../assets/img/undraw_empty_xct9.png')}
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
        />
      </View>      
    );
  }
}