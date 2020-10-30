// reset global variables
global.set("usercount","")
global.set("codes","")
global.set("name","")
global.set("picture","")
global.set("LockTime","") 
global.set("MaxRetries","")
global.set("NeedCodeToArm","")

var msgs = [];
var codes = [];
var name = [];
var picture = [];
var needcode = msg.payload.code_to_arm;
var lockout = msg.payload.passcode_attempts_timeout;
var pass_attempts = msg.payload.passcode_attempts
var count = 0;
for (var i = 0; i< msg.payload.users.length; i++) {
  if ( msg.payload.users[i].enabled === true) {
    codes.push(msg.payload.users[i].code);
    name.push(msg.payload.users[i].name);
    picture.push(msg.payload.users[i].picture);
    count +=1
  }
}
global.set("usercount",count)
global.set("codes",codes)
global.set("name",name)
global.set("picture",picture)
global.set("LockTime",lockout) 
global.set("MaxRetries",pass_attempts)
global.set("NeedCodeToArm",needcode)

msgs.push({payload: codes});
// msgs.push({payload: needcode}); //Debugging
return [msgs]

