import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Alert, Dimensions } from 'react-native';

import { Ionicons, MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons';

import firebase from 'firebase';

import * as ImagePicker from 'expo-image-picker';

import {Checkbox, Menu, Divider, Provider} from 'react-native-paper';
import {TextInput as TextInputP} from 'react-native-paper';
import {Button as ButtonP} from 'react-native-paper';

// Screen dimensions
const screen = {
  width: new Dimensions.get('window').width,
  height: new Dimensions.get('window').height
}

export default class FormPublish extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        blob: null,
        category: 'Seleccionar categoria',
        value: '',
        quantity: 1,
        unity: 'Unidade(s)', 
        uri: '',
        promotional: false,
        imgAspecRatio: {x: 2, y:2},
        selectCategoryVisible: false,

        selectUnityVisible: false,
      }

      this.database = firebase.database();
    }

    async chooseImage() {
      const accepted = ['png', 'jpg', 'jpeg'];

      const result = await ImagePicker.launchImageLibraryAsync();
      if(!result.cancelled) {
        const uri = result.uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        const ext = blob.type.split('/')[1];
        console.log(ext);
        if(!accepted.includes(ext)) {
          Alert.alert('O ficheiro que carregou não é suportado!');
          return;
        } else {
          console.log(blob);
          this.setState({uri, blob});
        }
      }
    }

    adjustAspectRatio(aspect) {
      switch (aspect) {
        case 'square':
          this.setState({imgAspecRatio: {x: 2, y:2}})
        break;
        case 'horizontal':
          this.setState({imgAspecRatio: {x: 3, y:2}})
        break;
        case 'vertical':
          this.setState({imgAspecRatio: {x: 2, y:3}})
        break;
      }
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
          <TextInputP
            label="Titulo"
            value={this.state.title}
            onChangeText={(text)=> {
              this.setState({title :text})
            }}
            mode='outlined'
            style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font'}}
          />

          <Text style={{fontFamily: 'Main-Font', color: '#777', fontSize: 12, marginTop: 10}}>Preço por unidade(s)</Text>
          <View
            style={{
              borderWidth: 1, 
              borderColor: '#999',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 10,
              padding: 5
            }}
          >
            <TextInputP
              label="Valor"
              value={this.state.value}
              onChangeText={(text)=> {
                this.setState({value: text})
              }}
              mode='outlined'
              style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', margin: 5, marginTop: 0, width: screen.width - 20}}
            />
            <View
              style={{width: screen.width - 20, borderWidth: 1, borderColor: '#ddd', marginBottom: 5, borderRadius: 5, padding: 5}}
            >
              <TextInputP
                label="Quantidade"
                value={this.state.quantity}
                onChangeText={(text)=> {
                  this.setState({quantity: text})
                }}
                mode='outlined'
                style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', margin: 5, flex: 0.6}}
              />
  
              <View>
                <Provider>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Menu
                      visible={this.state.selectUnityVisible}
                      style={{alignItems: 'center'}}
                      onDismiss={()=> this.setState({selectUnityVisible: !this.state.selectUnityVisible})}
                      anchor={
                        <ButtonP mode='contained' color='#666' backgroundColor='#eee' style={{width: screen.width - 40}}
                          onPress={()=> 
                          this.setState({selectUnityVisible: !this.state.selectUnityVisible})
                          }
                        >
                          {this.state.unity}
                        </ButtonP>
                      }
                      >
                      <Menu.Item onPress={() => {this.setState({unity: 'Unidade(s)', selectUnityVisible: false})}} title='Unidades(s)' />
                      <Menu.Item onPress={() => {this.setState({unity: 'kg', selectUnityVisible: false})}} title="Kg" />
                      <Divider />
                      <Menu.Item onPress={() => {this.setState({unity: 'litro', selectUnityVisible: false})}} title="Litros" />
                    </Menu>
                  </View>
                </Provider>
              </View>
            </View>
          </View>

          <View style={{zIndex: 10}}>
            <Provider>
              <View
                style={{
                  paddingTop: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Menu
                  visible={this.state.selectCategoryVisible}
                  onDismiss={()=> this.setState({selectCategoryVisible: !this.state.selectCategoryVisible})}
                  anchor={
                    <ButtonP mode='contained' color='#666' backgroundColor='#eee' style={{width: screen.width - 10}}
                      onPress={()=> 
                      this.setState({selectCategoryVisible: !this.state.selectCategoryVisible})}>
                      {this.state.category}
                    </ButtonP>
                  }
                  >
                  <Menu.Item onPress={() => {this.setState({category: 'Computadores e Informática', selectCategoryVisible: false})}} title="Computadores e Informática" />
                  <Menu.Item onPress={() => {this.setState({category: 'Mobília e jardim', selectCategoryVisible: false})}} title="Mobília e jardim" />
                  <Divider />
                  <Menu.Item onPress={() => {this.setState({category: 'Celulares e tablets', selectCategoryVisible: false})}} title="Celulares e tablets" />
                </Menu>
              </View>
            </Provider>
          </View>

          <ButtonP mode='contained'
            icon='image'
            onPress={()=> this.chooseImage()}
            style={{marginBottom: 10, marginTop: 10, backgroundColor: '#666'}}
          >
            Carregar foto
          </ButtonP>

          <View style={{
            width: screen.width - 10,
            backgroundColor: '#f9f9f9',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            display: this.state.uri === '' ? 'none' : 'flex'
          }}>
            <View style={{marginLeft: 5, flexDirection: 'row'}}>
              <FontAwesome.Button name='square-o' backgroundColor='none' color='#777' onPress={()=> this.adjustAspectRatio('square')}/>
              <MaterialIcons.Button name='landscape' backgroundColor='none' color='#777' onPress={()=> this.adjustAspectRatio('horizontal')}/>
              <MaterialIcons.Button name='portrait' backgroundColor='none' color='#777' onPress={()=> this.adjustAspectRatio('vertical')}/>
            </View>

            <View style={{flexDirection: 'row', height: 160}}>
              <Image 
                source={{uri: this.state.uri}}
                style={{width: 50*this.state.imgAspecRatio.x, height: 50*this.state.imgAspecRatio.y}}
              />
            </View>
            
            <ButtonP icon='close' mode='text'
              style={{ top: 0, right: 0}}
              onPress={()=> this.setState({uri: '', blob: null})}
            >
              Remover
            </ButtonP>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <Checkbox
              status={this.state.promotional ? 'checked' : 'unchecked'}
              color='#6200ee'
              onPress={() => {
                this.setState({promotional: !this.state.promotional});
              }}
            />
            <Text style={{fontFamily: 'Main-Font'}}>Promocional</Text>
          </View>

          <ButtonP mode='contained'
            onPress={()=> {
              if(this.state.blob === null) {
                Alert.alert('Carregue uma imagem!');
                return;
              }

              const {title, value, category, quantity, unity, promotional} = this.state;
              const {x, y} = this.state.imgAspecRatio;
              const ratio = {x, y};
              const img = { path: '', ratio}
              const user = this.props.tokken;
              const date = new Date().getTime();
              // console.log({title, value, category, quantity, unity, promotional, img, user, date})
              const hasImage = this.state.blob !== null;

              const id = this.database.ref('products').push({
                title, value, category, quantity, unity, promotional, img, user, date, hasImage
              }).key;

              if(this.state.blob !== null) {
                try {
                  const ref = firebase.storage().ref().child('products-images/' + id);
                  ref.put(this.state.blob);
                  console.log('success!');
                } catch (err) {
                  console.error(err);
                }
              } 
            }}
          >
            Publicar
          </ButtonP>
        </ScrollView>
      );
    }
}