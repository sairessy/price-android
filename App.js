import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

// React-native-paper components
import {Checkbox} from 'react-native-paper';
import {TextInput as TextInputP} from 'react-native-paper';
import {Button as ButtonP} from 'react-native-paper';

// Firebase
import firebase from 'firebase';
import firebaseConfig from './src/modules/firebaseApiKeys';
firebase.initializeApp(firebaseConfig);  

// Screen dimensions
const screen = {
  width: new Dimensions.get('window').width,
  height: new Dimensions.get('window').height
}

// Custom components
import Product from './components/Product';

// Screens
import FormPublish from './screens/FormPublish';
import Panel from './screens/Panel';
import Info from './screens/Info';
import PasswordRecovery from './screens/PasswordRecovery';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: false,
      showFormPublish: false,
      showFormLogin: false,
      showFormSignUp: false,
      showPanel: false,
      showInfo: false,
      showPassowordRecovery: false,
      // Signup
      signupEmail: '',
      signupPass: '',
      signupConfirmPass: '',
      // Login
      loginEmail: '',
      loginPass: '',
      // Login info
      tokken: '',
      products: [],
      remember: true,
      showSearchForm: false,
      searchText: '',
      userInfo: {},
      storeName: ''
    }

    this.database = firebase.database(); 
    this.loadFonts();
    this.checkAuthStatus();
  }

  async componentDidMount() {
    this.getProducts(); 
    // this.retrieveUserInfo();
  }

  // Retrieve user info such as email, profile picture,...
  async retrieveUserInfo() {
    this.database.ref('users').on('value', (data, err)=> {
      const users = data.val();
      const user = users[this.state.tokken];
      console.log(user);
      return;
      const { email, name } = user;
      this.setState({userInfo: {
        email, name
      }})
    });
  }

  // Load fonts
  async loadFonts() {
    await Font.loadAsync({
      "Title-Font": require('./assets/fonts/Inkfree.ttf'),
      "Main-Font": require('./assets/fonts/Roboto-Regular.ttf')
    });
  }

  // Login
  async login() {
    {
      let success = false;

      this.database.ref('users').once('value', (data, err)=> {
        const users = data.val();
        const keys = Object.keys(users);
        const user = {
          email: this.state.loginEmail,
          pass: this.state.loginPass
        }

        for (let i = 0; i < keys.length; i++) {
          const tokken = keys[i];
          const u = users[tokken];

          if(u.email === user.email && u.pass === user.pass) {
            success = true; 
            
            if(this.state.remember) {
              AsyncStorage.setItem('tokken', tokken);
            }
              
            this.setState({
              tokken: tokken,
              showFormLogin: false,
              showFormSignUp: false,
              logged: true
            });

            break;
          }
        }
      });

      if(!success) {
        Alert.alert('Usuário ou senha invalida!')
      }
    }
  }

  // Check if the user is alredy authenticated
  async checkAuthStatus() {
    const tokken = await AsyncStorage.getItem('tokken');
    if(tokken !== null) {
      this.setState({tokken: tokken, logged: true});
    }
  }

  // get products
  async getProducts() {
    firebase.database().ref('products').on('value', (_data, err)=> {
      const data = _data.val();
      const keys = Object.keys(data);
      let products = [];

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        let d = data[k];
        d.id = k;
        products.push(d);
      }

      this.setState({products: products});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* Home View */}
        <View>
          {/* Home View Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#aaa',
              backgroundColor: '#fff',
              height: 40,
              width: screen.width
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Ionicons.Button name="ios-menu-outline" size={20} color="black" backgroundColor='none'
                onPress={()=> {}}
              />
              <Text style={{fontSize: 18, fontFamily: 'Title-Font'}}>Price</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >

              <MaterialIcons.Button name="search" size={20} color="black"  backgroundColor='none'
                onPress={()=> {
                  this.setState({
                    showFormPublish: false,
                    showFormLogin: false,
                    showFormSignUp: false,
                    showPanel: false,
                    showInfo: false,
                    showSearchForm: !this.state.showSearchForm
                  });
                }}
              />
              
              <Ionicons.Button name="ios-analytics-outline"
                color={this.state.showPanel ? '#6200ee' : 'none'} 
                backgroundColor='none'
                style={{
                  display: this.state.logged ? 'flex' : 'none'
                }}
                onPress={()=> {
                  this.setState({
                    showFormPublish: false,
                    showFormLogin: false,
                    showFormSignUp: false,
                    showPanel: !this.state.showPanel,
                    showInfo: false,
                  });
                }}
              />
              <Ionicons.Button name="ios-information-circle-outline" size={20} 
                color={this.state.showInfo ? '#6200ee' : 'none'}
                backgroundColor='none'
                style={{
                  display: this.state.logged ? 'flex' : 'none'
                }}
                onPress={()=> {
                  this.setState({showInfo: !this.state.showInfo});
                  this.setState({
                    showFormPublish: false,
                    showFormLogin: false,
                    showFormSignUp: false,
                    showPanel: false,
                    showInfo: !this.state.showInfo,
                  });
                }}
              />
              <Ionicons.Button 
                name="ios-add-outline" size={24} 
                color={this.state.showFormPublish ? '#6200ee' : 'none'} backgroundColor='none'
                style={{
                  display: this.state.logged ? 'flex' : 'none'
                }}
                onPress={()=> {
                  this.setState({
                    showFormPublish: !this.state.showFormPublish,
                    showFormLogin: false,
                    showFormSignUp: false,
                    showPanel: false,
                    showInfo: false,
                  });
                }}
              />
              <Ionicons.Button name="ios-log-in-outline" size={22} color="#6200ee" backgroundColor='none'
                style={{
                  display: !this.state.logged ? 'flex' : 'none'
                }}
                onPress={()=> {
                  this.setState({
                    showFormPublish: false,
                    showFormLogin: !this.state.showFormLogin,
                    showFormSignUp: false,
                    showPanel: false,
                    showInfo: false,
                  });
                }}
              />
            </View>
          </View>

          {/* Home View main */}
          <ScrollView
            style={{
              height: screen.height - 40,
              backgroundColor: '#fff',
              borderColor: '#ddd',
              borderWidth: 1
            }}
          >
            {/* Search */}
            <View
              style={{
                backgroundColor: '#fcfcfc', 
                width: screen.width - 2, 
                borderWidth: 1,
                borderColor: '#fcfcfc',
                borderBottomColor: '#f9f9f9',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingBottom: 5,
                display: this.state.showSearchForm ? 'flex' : 'none'
              }}
            >
              <TextInputP label='Pesquisar' value={this.state.searchText} mode='outlined'
                style={{height: 30, backgroundColor: '#fff'}}
                onChangeText={(text)=>{
                  this.setState({searchText: text})
                }}
              />
              <MaterialIcons.Button 
                name='close'
                backgroundColor='none'
                color='#000'
                onPress={()=> {
                  this.setState({showSearchForm: false});
                }}
              />
            </View>

            {/* Show products */}
            {
              this.state.products.map(product=> {
                if(this.state.products.length > 0) {
                  return (<Product 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    value={product.value}
                    date={product.date}
                    hasImage={product.hasImage}
                    ratio={product.img.ratio}
                    quantity={product.quantity}
                    unity={product.unity}
                    name={product.name}
                    user={product.user}
                  />);
                }
              })
            }

            <TouchableOpacity
              style={{
                backgroundColor: '#6200ee',
                borderRadius: 4,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 2,
                display: this.state.products.length > 0 ? 'flex' : 'none'
              }}
            >
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff"  backgroundColor='#6200ee'/>
            <Text style={{color: '#fff', fontFamily: 'Main-Font'}}>Mostrar mais</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* FormPublish screen View */}
        <FormPublish show={this.state.showFormPublish} tokken={this.state.tokken}/>

        {/* Login View */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#fff',
            width: screen.width,
            height: screen.height,
            display: this.state.showFormLogin && !this.state.logged ? 'flex' : 'none'
          }}
        >
          <Image source={require('./assets/img/banner.png')} 
            style={{
              width: screen.width, 
              height: screen.height * 0.35,
              display: 'none' 
            }} 
          />
            <View
              style={{
                position: 'absolute', 
                top: 50,
                flexDirection: 'row',
                flex: 1,
                width: screen.width,
                justifyContent: 'center'
              }}
            >
              <Text style={{fontSize: 32, fontFamily: 'Title-Font'}}>Price</Text>
            </View>
            <View style={{padding: 5, position: 'absolute', top: 130, width: screen.width}}>
              <TextInputP
                label="Email"
                value={this.state.loginEmail}
                onChangeText={(text)=> {this.setState({loginEmail: text})}}
                mode='outlined'
                style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
              />

              <TextInputP
                label="Senha"
                value={this.state.loginPass}
                onChangeText={(text)=> {this.setState({loginPass: text})}}
                mode='outlined'
                style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font'}}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  status={this.state.remember ? 'checked' : 'unchecked'}
                  color='#6200ee'
                  onPress={() => {
                    this.setState({remember: !this.state.remember});
                  }}
                />
                <Text style={{fontFamily: 'Main-Font', fontSize: 12}}>Lembrar-se de mim</Text>
              </View>

              <ButtonP mode='contained'
                onPress={()=> this.login()}
              >
                Entrar
              </ButtonP>

              <TouchableOpacity
                style={{
                  marginTop: 10
                }}
                onPress={()=> {
                  this.setState({showFormSignUp: true})
                }}
              >
                <Text style={{color: '#6200ee', fontSize: 11, fontFamily: 'Main-font'}}>Criar uma nova conta!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 10
                }}
                onPress={()=> {
                  this.setState({showPassowordRecovery: true})
                }}
              >
                <Text style={{color: '#6200ee', fontSize: 11, fontFamily: 'Main-font'}}>Esqueceu a senha?</Text>
              </TouchableOpacity>

            </View>
            <TouchableOpacity 
              style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                position: 'absolute',
                top: 10
              }}
              onPress={()=> {
                this.setState({showFormSignUp: false, showFormLogin: false})
              }}
            >
              
              <MaterialIcons name="chevron-left" size={20} color="black" backgroundColor='none' />
              <Text style={{fontFamily: 'Main-Font'}}>Voltar</Text>
          </TouchableOpacity>
        </View>

        {/* Signup View */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#fff',
            width: screen.width,
            height: screen.height,
            display: this.state.showFormSignUp ? 'flex' : 'none'
          }}
        >
          {/* <ActivityIndicator size='small' /> */}
          <Image source={require('./assets/img/banner.png')} 
            style={{
              width: screen.width, 
              top: 0,
              height: screen.height * 0.35,
              display: 'none'
            }} 
          />
          <View
            style={{
              position: 'absolute', 
              top: 50,
              flexDirection: 'row',
              flex: 1,
              width: screen.width,
              justifyContent: 'center'
          }}
          >
            <Text style={{fontSize: 32, fontFamily: 'Title-Font'}}>Price</Text>
          </View>
          <View style={{padding: 5, position: 'absolute', top: 130, width: screen.width}}>
            <TextInputP
              label="Nome do estabelecimento"
              value={this.state.storeName}
              onChangeText={(text)=> {this.setState({storeName: text})}}
              mode='outlined'
              style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font'}}
            />
            
            <TextInputP
              label="Email"
              value={this.state.signupEmail}
              onChangeText={(text)=> {
                this.setState({signupEmail: text});
              }}
              mode='outlined'
              style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
            />     

            <TextInputP
              label="Senha"
              value={this.state.signupPass}
              onChangeText={(text)=> {
                this.setState({signupPass: text});
              }}
              mode='outlined'
              style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
            />
            
            <TextInputP
              label="Confirmar senha"
              value={this.state.signupConfirmPass}
              onChangeText={(text)=>  this.setState({signupConfirmPass: text})}
              mode='outlined'
              style={{backgroundColor: '#fff', height: 45, fontFamily: 'Main-Font', marginBottom: 5}}
            />

            <ButtonP
              mode='contained'
              style={{marginTop: 10, fontFamily: 'Main-Font'}}
              onPress={()=> {
                if(this.state.signupPass !== this.state.signupConfirmPass) {
                  console.log('As senhas não coincidem!');
                } else {
                  const user = {
                    email: this.state.signupEmail,
                    pass: this.state.signupPass,
                    name: this.state.storeName
                  }

                  const tokken = this.database.ref('users').push(user);
                  this.setState({tokken});
                  Alert.alert('Cadastrado com sucesso, faça o login!');
                  this.setState({showFormSignUp: false, showFormLogin: true});
                }
              }}
            >
              Cadastrar
            </ButtonP>

            <TouchableOpacity
              style={{
                marginTop: 10
              }}
              onPress={()=> {
                this.setState({showFormSignUp: false})
              }}
            >
              <Text style={{color: '#6200ee', fontSize: 11, fontFamily: 'Main-Font'}}>Fazer login!</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={{
              flexDirection: 'row', 
              alignItems: 'center', 
              position: 'absolute',
              top: 10
            }}
            onPress={()=> {
              this.setState({showFormSignUp: false, showFormLogin: false})
            }}
          >
            
            <MaterialIcons name="chevron-left" size={20} color="black" backgroundColor='none' />
            <Text style={{fontFamily: 'Main-Font'}}>Voltar</Text>
          </TouchableOpacity>
        </View>

        {/* Screen Panel */}
        {this.state.logged ?
          <Panel show={this.state.showPanel} tokken={this.state.tokken} 
          btn={
            <ButtonP
              mode='outlined'
              icon='logout'
              style={{marginTop: 10, fontFamily: 'Main-Font'}}
              onPress={()=> {
                AsyncStorage.removeItem('tokken');
                this.setState({
                  logged: false,
                  showFormPublish: false,
                  showFormLogin: true,
                  showFormSignUp: false,
                  showPanel: false,
                  showInfo: false,
                });
              }}
            >
              Terminar sessão
            </ButtonP>
          }
        /> : <View></View>
      }

        {/* Info screen View */}
        <Info show={this.state.showInfo}/>

        {/* Screen Password recovery */}
        <PasswordRecovery 
          show={this.state.showPassowordRecovery}
          btn={
            <TouchableOpacity 
              style={{
                flexDirection: 'row', 
                alignItems: 'center'
              }}
              onPress={()=> {
                this.setState({showPassowordRecovery: false});
              }}
            >              
              <Text style={{fontFamily: 'Main-Font', color: '#6200ee', fontSize: 12, marginTop: 10}}>Cancelar</Text>
          </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
