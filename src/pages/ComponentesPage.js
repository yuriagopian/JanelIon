import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,Slider
} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native';
import firebase from 'firebase';
import axios from 'axios';
import Lottie from 'lottie-react-native';
//export const firebaseDatabase = firebase.database();


import janela from '../assets/janela_splash.png';
import animation from '../../../janelIon/rain.json';
import animationSun from '../../../janelIon/sun.json';



// var config = {
//     apiKey: "AIzaSyCz6iz_KrmCBGEivHFyv9nW_I4jw17Yjco",
//     authDomain: "janelion-9d669.firebaseapp.com",

//     databaseURL: "https://janelion-9d669.firebaseio.com",
//     projectId: "janelion-9d669",
//     storageBucket: "janelion-9d669.appspot.com",
//     messagingSenderId: "335541498943",
//     appId: "1:335541498943:web:8d0b76c9eedb69b092348a",
//     measurementId: "G-RJ96W1S8DL"
//   };

//   firebase.initializeApp(config);

  

export default class ComponentesPage extends React.Component{
    constructor (props) {
        super(props);
        this.state ={
            mail: '',
            password :'' ,
            isLoading:false,
            message: '',
        //     isOn: axios.get("https://janelion-9d669.firebaseio.com/Janela.json")
        //     .then((response) =>{
        //          //console.log(response.data);
        //          this.setState({isOn:response.data});
        // })   ,
            ledState: false,
            slideValue:1,
            
            //chuva:true          


        }
    };
 
    componentDidMount(){
        axios.get("https://janelion-9d669.firebaseio.com/Janela.json")
        .then((response) =>{
             //console.log(response.data);
             this.setState({isOn:response.data});
    });

    axios.get("https://janelion-9d669.firebaseio.com/Chuva.json")
        .then((response) =>{
             //console.log(response.data);
             this.setState({chuva:response.data});
    });   

    
   
};

    

    

    handleOnToggle = async isOn =>{
       if(this.state.isOn==true)
       {
           this.setState({isOn:false});
           axios
           .patch("https://janelion-9d669.firebaseio.com/.json",
             {"Janela":this.state.isOn}
           )
            .then(res=> {
                //console.log(res);
                //console.log(res.data);
            })

       }else{
        this.setState({isOn:true});
        axios
        .patch("https://janelion-9d669.firebaseio.com/.json",
          {"Janela":this.state.isOn}
        )
         .then(res=> {
             //console.log(res);
             //console.log(res.data);
         })

       }
        // this.setState({ isOn: !this.state.isOn });
        // axios
        // .patch("https://janelion-9d669.firebaseio.com/.json",
        //   {"Janela":this.state.isOn}
        // )
        //  .then(res=> {
        //      console.log(res);
        //      console.log(res.data);
        //  })
        // // axios.put("https://janelion-9d669.firebaseio.com/Janela.json", {
        // //             "Janela": this.state.isOn
        //         })
        //console.log(this.state);
        axios.get("https://janelion-9d669.firebaseio.com/Janela.json")
        .then((response) =>{
             //console.log(response.data);
             //this.setState({isOn:response.data});
        }) ;  
       };

    


    render() { 
        return (<>

                <View style= {styles.container}>

                   <StatusBar
                       barStyle="dark-content"
                        hidden={false}
                        backgroundColor="#565CCE"
                    /> 

                    <View style={{ backgroundColor: '#fff', 
                    borderBottomRightRadius: 15, 
                    borderBottomLeftRadius: 15,
                    height:300,
                    width: '100%' }}>
                        <Text style={style = styles.textItens}>Componentes</Text>

                        <ScrollView
                            style={styles.scrollMenu}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >

                            <TouchableOpacity style={styles.buttonMenu}>
                                <Image  style={{height:300,width: 300, marginTop:130,marginLeft:50, 
                                alignContent:'center',
                                alignItems:'center'
                            }}
                                source={require('../assets/janela_splash.png')} 
                                    />
                             <Text style={style = styles.buttonText}></Text>
                            </TouchableOpacity>
                            


                    </ScrollView>
                    
                    <ToggleSwitch
                            isOn= {!this.state.isOn}
                            onColor="green"
                            offColor="red"
                            label="Closed/Opened"
                            labelStyle={{ color: "black", fontWeight: "700" }}
                            size="large"
                            onToggle={ this.handleOnToggle }                                                                                 
                            
                     /> 
                 
{/*                     
            <Slider 
            style={{width:'100%'}} 
            step={1} 
            maximumValue={100}
            minimumTrackTintColor={'red'}
            maximumTrackTintColor={'blue'}
            value ={this.state.slideValue} 
            //onChange={(slideValue)=> this.setState } 
           // onChange={this.HandleSlide }
            /> */}

                           

                </View>
            {/* <View  style={styles.divAnimation} >
                <Lottie  autoSize source= {animation} autoPlay  loop 
                style={styles.animationChuva}/> 

                <Lottie  autoSize source= {animationSun} autoPlay  loop 
                style={styles.animationSol}/> 
            </View >     */}
            {this.renderClima()}
                </View>
                
                </>
            )
        };

        renderClima(){
           // const chuva = this.state.chuva;
           axios.get("https://janelion-9d669.firebaseio.com/Chuva.json")
           .then((response) =>{
                //console.log(response.data);
                this.setState({chuva:response.data});
       }); 
      
        
       
            if(this.state.chuva==true){
                axios.get("https://janelion-9d669.firebaseio.com/Janela.json")
                .then((response) =>{
                     //console.log(response.data);
                     this.setState({isOn:!response.data});
            }); 
                
                
                return (
                    
                    <View  style={styles.divAnimation} >

                        <View><Text> Chovendo</Text></View>
                       
                        <Lottie  autoSize source= {animation} autoPlay  loop 
                        style={styles.animationChuva}/>         
                       
                    </View >   

                )
            }else{
            return (
                <View  style={styles.divAnimation} >
                    <View><Text>Ensolarado</Text></View>
                    <Lottie  autoSize source= {animationSun} autoPlay  loop 
                    style={styles.animationSol}/> 
               </View >   
            ) 
            }   
      
          };
        
}




const styles = StyleSheet.create({
        container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#6ca2f7',
    },

    scrollMenu: {
        marginBottom: 5,
        backgroundColor: 'grey',
        height: 90,
    },

    scrollControle: {
        marginTop: 30,
        //backgroundColor: '#6ca2f7',



    },

    viewControle: {
        flex: 1,
    },

    input: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#EEE',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginBottom: 10,
    },

    buttonMenu: {
        flexDirection: 'row',
        height: 200,
        //backgroundColor: "#6ca2f7",
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 8,
    },

    buttonControle: {
        flexDirection: 'row',
        height: 40,
        width: '48%',
       // backgroundColor: "#6ca2f7",
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 3,
    },

    buttonImg: {
        //height: 250,
        //width : 800,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textItens: {
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        //fontFamily: 'Times New Roman',
        alignItems: 'center',
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 15,

    },

    animationChuva: {
        width:100,
        height:100,
        paddingTop: 20,
        justifyContent:'flex-end',
        
        
        

    },
    animationSol: {
        width:100,
        height:100,
        paddingTop: 20,
        justifyContent:'flex-end',
        
        

    },
    divAnimation: {
        alignItems: 'center',
        paddingTop: 20,
    }



});

