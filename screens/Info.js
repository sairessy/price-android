import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <ScrollView
        style={{
          position: 'absolute',
          top: 40,
          left: 0,
          backgroundColor: '#fff',
          width: screen.width,
          padding: 5,
          height: screen.height - 40,
          display: this.props.show ? 'flex' : 'none'
        }}
      >
         <Text style={{marginBottom: 5, color: '#555', fontSize: 12, fontFamily: 'Main-font'}}>CONTACTE-NOS</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons.Button name="email" size={20} color="#777" backgroundColor='none'
            onPress={()=> {}}
          />

          <FontAwesome.Button name="whatsapp" size={20} color="#25d366" backgroundColor='none'
            onPress={()=> {}}
          />

          <MaterialIcons.Button name="phone" size={20} color="#777" backgroundColor='none'
            onPress={()=> {}}
          />
        </View>

        <Text style={{marginBottom: 5, color: '#555', fontSize: 12, fontFamily: 'Main-font'}}>SIGA-NOS NAS REDES SOCIAIS</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons.Button name="facebook" size={20} color="#1877f2" backgroundColor='none'
            onPress={()=> {}}
          />

          <FontAwesome.Button name="instagram" size={20} color="#c32aa3" backgroundColor='none'
            onPress={()=> {}}
          />
          
        </View>
      </ScrollView>
    );
  }
}