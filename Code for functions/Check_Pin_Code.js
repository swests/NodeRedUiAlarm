// variables
var msgs = {};
var codes = [];
var key_input = parseInt(msg.payload[0]);  //comes in a string, needs to be int
var action_input = msg.payload[1];
var msg_error = 0;
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

// Only check pin if DISARM
if (action_input == 'ARM_AWAY') {
    key_check = true;
}

else {
    key_check = conf_codes.includes(key_input);
}

// key_check = true; // temp

if (key_check == true) { 

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

if (key_check == false) { 
    msg_error = 1;
    msgs.pin = "Wrong PIN";
}

// check failed counter or reset to 0    
if (msg_error == 1 ) {
    counter += 1;
    global.set("Counter", counter);
}
if (msg_error == 0 ) {
    counter = 0; 
    global.set("Counter", counter);
}
msgs.counter = counter

// initiate lock state
if ( counter >= maxretries ) { 
    msgs.locked = "locked";
} 
if ( counter <= maxretries ) { 
    msgs.locked = "unlocked";
}

if ( msgs.locked == "locked") { 
    node.log("1");
    return [ null, msgs, null, null]; 
}
if ( key_check == true ) { 
    node.log("2");
    return [ msg, null, null, null]; 
}
if ( key_check == false ) { 
    node.log("3");
    return [ null, null, null, msgs]; 
}
else {
    node.log("4");
    return [ null, null, msgs, null];
}

