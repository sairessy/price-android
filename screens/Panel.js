import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';


import firebase from 'firebase';
// import firebaseConfig from '../modules/firebaseApiKeys';

// Custom components
import UserProduct from '../components/UserProduct';
import UpdateProfile from '../components/UpdateProfile';
import ConfigPrivacy from '../components/ConfigPrivacy';
import Illustration from '../components/Illustration';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showConfigPrivacyTab: false,
      showProductsTab: true,
      showProfileTab: false,
    }

  }

  async componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    firebase.database().ref('products').on('value', (_data, err)=> {
      const data = _data.val();
      const keys = Object.keys(data);
      let products = [];

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if(data[k].user === this.props.tokken) {
          let d = data[k];
          d.id = k;
          products.push(d);
        }
      }

      this.setState({ products: products }, ()=> {
        console.log(this.state.products)
      });
    });

  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 40,
          left: 0,
          backgroundColor: '#fff',
          width: screen.width,
          height: screen.height - 40,
          display: this.props.show ? 'flex' : 'none'
        }}
      >
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
          <TouchableOpacity
            onPress={()=> this.setState({showConfigPrivacyTab: false, showProductsTab: true, showProfileTab: false})}
            style={{
              display: 'flex', 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'row', 
              padding: 5
            }}
          >
            <MaterialIcons size={20} name='bar-chart' 
              backgroundColor='none'
              color={this.state.showProductsTab ? "#6200ee" : '#777'}
            />
            <Text style={{marginLeft: 5, fontSize: 11, fontFamily: 'Main-font'}}>Productos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> this.setState({showProfileTab: true, showProductsTab: false, showConfigPrivacyTab: false})}
            style={{
              display: 'flex', 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'row', 
              padding: 5
            }}
          >
            <Ionicons size={20} name='person' backgroundColor='#fff' 
              color={this.state.showProfileTab ? "#6200ee" : '#777'}
            />
            <Text style={{marginLeft: 5, fontSize: 11, fontFamily: 'Main-font'}}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> this.setState({showConfigPrivacyTab: true, showProductsTab: false, showProfileTab: false})}
            style={{
              display: 'flex', 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'row', 
              padding: 5
            }}
          >
            <MaterialIcons size={20} name='privacy-tip' backgroundColor='#fff' 
              color={this.state.showConfigPrivacyTab ? "#6200ee" : '#777'}
            />
            <Text style={{marginLeft: 5, fontSize: 11, fontFamily: 'Main-font'}}>Privacidade</Text>
          </TouchableOpacity>
        </View> 

        <ScrollView>
          {/* Show products */}
          <View
            style={{
              padding: 5,
              display: this.state.showProductsTab ? 'flex' : 'none'
            }}
          >
            {
              this.state.products.length > 0 ?
              this.state.products.map(product=> {
                return <UserProduct 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                />
              }) : <View></View>
            }

            <Illustration 
              imgUri={'../assets/img/undraw_empty_xct9.png'}
              width={screen.width - 20} 
              height={300} 
              show={this.state.products.length === 0}
            />
          </View>
          
          {/* Profile settings */}
          <UpdateProfile tokken={this.props.tokken} show={this.state.showProfileTab}/>
          <ConfigPrivacy tokken={this.state.tokken} show={this.state.showConfigPrivacyTab} endSessionBtn={this.props.btn}/>
        </ScrollView>
      </View>
    );
  }
}