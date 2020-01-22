import React from 'react';
import {
  View,
  Text, 
  TextInput, 
  StyleSheet,  
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  AsyncStorage
  } 
  from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native';

import firebase from 'firebase';
import Lottie from 'lottie-react-native';

import  FormRow from '../components/FormRow';
import janela from '../assets/janela-opacity.jpg';

import animation from '../../../janelIon/Animation.json';


// aqui estão localizadas as infromações da minha classe de login
export default class LoginPage extends React.Component{
    constructor (props) {
        super(props);
        this.state ={
            mail: '',
            password :'' ,
            isLoading:false,
            message: '',
            isOn: false

        }
    }


// parte de coneção com o firebase autentication
    componentDidMount(){
      // AsyncStorage.getItem("isOn").then((value) => {
      //  this.setState({isOn: value});
       // });
   
        AsyncStorage.getItem("mail").then((value) => {
        this.setState({mail: value});
        });
        
        AsyncStorage.getItem("password").then((value) => {
        this.setState({password: value});
        });

        

      // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCz6iz_KrmCBGEivHFyv9nW_I4jw17Yjco",
    authDomain: "janelion-9d669.firebaseapp.com",
    databaseURL: "https://janelion-9d669.firebaseio.com",
    projectId: "janelion-9d669",
    storageBucket: "janelion-9d669.appspot.com",
    messagingSenderId: "335541498943",
    appId: "1:335541498943:web:8d0b76c9eedb69b092348a",
    measurementId: "G-RJ96W1S8DL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
    }

  // os estados dos meus campos mail e password
    onChangeHandler(field, value) {
        this.setState({
            [field]:value
        });
    }
 handleOnToggle = async isOn =>{
  this.setState({ isOn: !this.state.isOn });
  console.log(this.state)
 };
 
    //função do Switch     
    // handleOnToggle= async isOn => {
    //   const {mail, password}= this.state;
      
    //   if(isOn) {
    //       await AsyncStorage.setItem('mail', mail);
    //       await AsyncStorage.setItem('password', password);

    //       this.setState({isOn:true});
          
          
    //       }
    //   else {
    //       await AsyncStorage.removeItem('mail', mail);
    //       await AsyncStorage.removeItem('password', password);
    //       this.setState({isOn:false});
    //       }
    //       console.log(this.state)
    //   };

    

    

    // seção de autenticação, aqui que são feitas a validações do login
    tryLogin () {
     this.setState({ isLoading: true, message:'' });
     const {mail, password}= this.state

        const loginUserSuccess = user => {
          this.setState({message: "Sucesso!"});
          this.props.navigation.navigate('Main');
        }      

        const loginUserFailer  = error => {
          this.setState({ 
            message: this.getMessageByErrorCode(error.code) });

        }

          // const guardaUser = async isOn =>{
          //   if (isOn){
          //     await AsyncStorage.setItem('mail', mail);
          //     await AsyncStorage.setItem('password', password);

          //   }else{
          //     await AsyncStorage.removeItem('mail',mail);
          //     await AsyncStorage.removeItem('password', password);

          //   }
          // }
          

        firebase
          .auth()
          .signInWithEmailAndPassword(mail,password)
          .then(loginUserSuccess)
          .catch(error => {
           if(  error.code === 'auth/user-not-found'){

        //Cria um alert dando  a opção de cadastro de cliente    
             Alert.alert('Usuário não encontrado',
             'Deseja criar um cadastro com as informações inseridas ?',
             [{
               text: 'Não',
               style:'cancel' // IOS
             },
            {
              text:'Sim',
              onPress: () => {
                firebase.auth()
                .createUserWithEmailAndPassword(mail,password)
                .then(user => {
                  this.setState({ message: "Sucesso!"});
                  //console.log('Usuário autenticado', user);
                })
                .catch(loginUserFailer)
                  //console.log('Usuário não encontrado ', error);
               
              }
            }],
              { cancelable: false }
             )
             return ;
           }  else {
             loginUserFailer(error);

              }              
          })
          .then(() => this.setState({isLoading:false})); 

    }
// Minhas mensagem de erro modificadas ficarão aqui.
    getMessageByErrorCode(errorCode){
      switch(errorCode){
         case 'auth/wrong-password':
           return 'Senha incorreta';
         case 'auth/user-not-found':
           return 'Usuário não encontrado';
         default: 
            return 'Erro desconhecido';  
      }
    }

    renderMessage(){
      const {message} = this.state;
      if(!message)
          return null;
      return (
        <View>
          <Text> {message}
          </Text>
        </View>
      );    

    }
// Meu botão de login junto a sua função
// Ao ser clicado ele ira para a parte de try login.
    renderButton(){
       if (this.state.isLoading)
         return <ActivityIndicator />;
      return (
      <TouchableOpacity 
            style={styles.button}
            onPress={ () => this.tryLogin()}>                    
               <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
                      );
    }

// Após o login minhas informações serão renderizadas na tela,.    
    render() {
        return ( <>
         <SafeAreaView style ={{justifyContent:'center', alignItems: 'center',backgroundColor :'#6ca2f7'}}>
        <Lottie  autoSize source= {animation} autoPlay  loop/>
        </SafeAreaView>
        <View style={styles.container}>
          <FormRow>
          <TextInput style={styles.input}
              placeholder = "Digite aqui seu e-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value = {this.state.mail}
              onChangeText={value => this.onChangeHandler('mail',value)}
                            
          />

          <TextInput style={styles.input}
              placeholder = "Digite aqui sua senha"
              placeholderTextColor="#999"
              secureTextEntry
              value = {this.state.password}
              onChangeText={value => this.onChangeHandler('password',value)}
                                      
          />               

          </FormRow>

          {this.renderButton()}
          {this.renderMessage()} 

           <ToggleSwitch
              isOn= {!this.state.isOn}
              onColor="purple"
              offColor="red"
              label="Keep me logged"
              labelStyle={{ color: "black", fontWeight: "700", padding :"10%"}}
              size="large"
              onToggle={ this.handleOnToggle } 
              //value = {this.state.isOn}
              //onChange = {value => this.handleOnToggle('isOn',value)} 
          /> 

          

        </View>
          </>
                
        )
    }
}

// Meu Css
const styles = StyleSheet.create({
   container:{
     alignSelf: 'stretch',
     paddingHorizontal: 30,
     marginTop: 50,
    
   },
  
  
    label: {
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 8,
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      marginBottom: 0,
      borderRadius: 2
    },
  
    button: {
      height: 42,
      backgroundColor: '#6ca2f7',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    backImage: {
      width : '100%',
      height :'100%',
      flexDirection: 'column',
      backgroundColor:'transparent',
      justifyContent: 'flex-start',     
      
    },
     form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  });



