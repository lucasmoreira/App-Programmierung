var messageCounter = 0;
// Create a client instance
client = new Paho.MQTT.Client("141.22.00.01", 1884, "Cordova_MQTT_Client_G1");
// set callback handlers
client.onConnectionLost = onConnectionLost; 
client.onMessageArrived = onMessageArrived;

// connect the client 
client.connect({ 
    onSuccess: onConnect, 
    cleanSession: true 
});

// called when the client connects
function onConnect() {
// Once a connection has been made, make a subscription and send a message. 
console.log("onConnect");
client.subscribe("iot/time", {
qos: 2
});
message = new Paho.MQTT.Message("Hello");
message.destinationName = "World";
client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
if (responseObject.errorCode !== 0) { 
    console.log("onConnectionLost:" + responseObject.errorMessage); 
}
}


// called when a message arrives
function onMessageArrived(message) {
messageCounter++;
console.log("onMessageArrived:");
console.log("QoS: " + message.qos); 
console.log(message.payloadString);
var mqttMsgCounter = document.getElementById('mqtt_message_counter'); 
mqttMsgCounter.innerHTML = String(messageCounter);
var mqttMsg = document.getElementById('mqtt_message');
mqttMsg.innerHTML = mqttMsg.innerHTML + JSON.stringify(message.payloadString); 
}