const { Board, Led, Servo} = require("johnny-five");
var five = require("johnny-five");
var firebase = require("firebase/app");
var firebase = require("firebase");



const board = new Board();

board.on("ready", () => {
 // const servo = new Servo(13);

  // Servo alternate constructor with optionsser
  
  var servo = new five.Servo({
    id: "MyServo",     // User defined id
    pin: 3,           // Which pin is it attached to?
    type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0,180],    // Default: 0-180
    fps: 100,          // Used to calculate rate of movement between positions
    invert: false,     // Invert all specified positions
    startAt: 90,       // Immediately move to a degree
    center: true,
    type: "continuous",      // overrides startAt if true and moves the servo to the center of the range
  });
  

  // Add servo to REPL (optional)
  board.repl.inject({
    servo:servo
  });


 
  servo.to(90, 500);
  servo.sweep();
  servo.cw(1);
});
 