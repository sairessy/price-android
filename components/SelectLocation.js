import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Dimensions  } from 'react-native';

import {Button as ButtonP} from 'react-native-paper';

// Screen dimensions
const screen = {
  width: new Dimensions.get('window').width,
  height: new Dimensions.get('window').height
}

export default class SelectLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // Automatically get user position
  async automaticallyGetPostion() {

  }

  render() {
    return (
      <View style={{padding: 5}}>
        <Text style={{color: '#777', fontSize: 12, margin: 5}}>Selecione a localização do estabelecimento</Text>
        <ButtonP mode='outlined'
          style={{
            backgroundColor: '#eee',
            borderColor: '#f9f9f9',
            borderRadius: 0
          }}
            onPress={()=> this.automaticallyGetPostion()}
          >
            Automática
          </ButtonP>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {/* MapView */}
        <View
          style={{ 
            width: screen.width - 20, 
            height: 150, 
            backgroundColor: '#f9f9f9',
          }}
        >
        </View>
      </View>  
      </View>   
    );
  }
}