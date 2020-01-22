const { Board, Led, Servo} = require("johnny-five");
var five = require("johnny-five");
var firebase = require("firebase/app");
var firebase = require("firebase");


const board = new five.Board();



board.on("ready", () => {
  const led = new Led(13);

//  const slider = new Servo("A0");
//  const tilt   =  new Servo(9);
 
//  slider.on("slide",() => {
//    tilt.to(slider.scaleTo(0,180));
//  });

  //const servo = new servo(13);

  // board.repl.inject({
  //   led : led
  // });
  // led.on();
  // led.off();

  //led.toggle();
  

  var config = {
    apiKey: "AIzaSyCz6iz_KrmCBGEivHFyv9nW_I4jw17Yjco",
    authDomain: "janelion-9d669.firebaseapp.com",
    databaseURL: "https://janelion-9d669.firebaseio.com",
    projectId: "janelion-9d669",
    storageBucket: "janelion-9d669.appspot.com",
    messagingSenderId: "335541498943",
    appId: "1:335541498943:web:8d0b76c9eedb69b092348a",
    measurementId: "G-RJ96W1S8DL"
  };

  firebase.initializeApp(config);
  
  var rootRef = firebase.database().ref("/led/led");

  rootRef.on('value', function(snapshot){
    if(snapshot.val()){
      led.on();
      console.log('oi servo');
    //  //motor.on("start", () => {
    //   console.log(`start: ${Date.now()}`);
  
    //   // Demonstrate motor stop in 2 seconds
    //   board.wait(3000, motor.stop);
    // });
    }else{
       led.off();
    }
  });


  // var starCountRef = firebase.database().ref('led');
  // starCountRef.on('value', function(snapshot) {
    
  //   const led = snapshot.val();

  //   if (led == 'on'){
  //     led.on();
  //  console.log('ligado')
      
  //   }
  //   else{
  //     console.log('desligado')
  //   }

    

  //})

});
