// variables
var msgs = {};
var codes = [];
var key_input = parseInt(msg.payload[0]);  //comes in a string, needs to be int
var action_input = msg.payload[1];
var key_check = false;
var usercode = [];

logging = {};
logging.payload = {};

// get global variables from config file
conf_usercount = global.get("usercount");
conf_codes = global.get("codes");
conf_name = global.get("name");
conf_picture = global.get("picture");
counter = global.get("Counter") ;
maxretries = global.get("MaxRetries");
need_pin_to_arm = global.get("NeedCodeToArm");

// timestamp
var today = new Date();
var timeAsString = today.toLocaleTimeString();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
} 

if (mm < 10) {
    mm = '0' + mm;
} 

var today1 = mm + '/' + dd + '/' + yyyy;

// Do we need a PIN to arm? Is the pin valid
if (action_input == 'DISARM' || need_pin_to_arm == true) {
    key_check = conf_codes.includes(key_input);
}
else  {
    key_check = true;
}

if (key_check == true) {  // if we have a valid pin then see if it also has a named user - for the log

    //logging
    for ( var i = 0; i < conf_codes.length; i++) {
        if ( conf_codes[i] == key_input ) 
        { 
            usercode = i;
        }
    }
    logging.payload.timestamp = today1 + " " + timeAsString;
    //logging.payload.today = today1
    //logging.payload.time = timeAsString;
    logging.payload.user = conf_name[usercode];
    logging.payload.state = msg.payload[1]
    node.send([null,null,logging])

}

// update "failed tries" counter or reset to 0 if we have a good pin
if (key_check == false) { 
//    msg_error = 1;
    msgs.pin = "Wrong PIN";
    counter += 1; 
    global.set("Counter", counter);
}
else {
    counter = 0; 
    global.set("Counter", counter);
}
msgs.counter = counter;


// initiate lock state
if ( counter >= maxretries ) { 
    msgs.locked = "locked";
} 
if ( counter <= maxretries ) { 
    msgs.locked = "unlocked";
}

//send result on one of the 4 outputs
if ( msgs.locked == "locked") { //too many fails so locked
    return [ null, msgs, null, null]; 
} else if ( key_check == true ) { //Correct pin
    return [ msg, null, null, null]; 
} else if ( key_check == false ) { //Incorrect pin
    return [ null, null, null, msgs]; 
}
else { // Not sure if this will ever fire...
    return [ null, null, msgs, null];
}

