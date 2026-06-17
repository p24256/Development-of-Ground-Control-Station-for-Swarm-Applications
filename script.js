// ===============================
// Change HTML Text
// ===============================

function changeText() {
    document.getElementById("demo").innerHTML = "See! I told you";
}

// ===============================
// Connect to ROS
// ===============================

var ros = new ROSLIB.Ros({
    url: "ws://localhost:9090"
});

ros.on("connection", function () {
    console.log("Connected to websocket server.");
});

ros.on("error", function (error) {
    console.log("Error connecting to websocket server:", error);
});

ros.on("close", function () {
    console.log("Connection to websocket server closed.");
});

// ===============================
// Subscribe to GPS Topic
// ===============================

var listener = new ROSLIB.Topic({
    ros: ros,
    name: "/fix",
    messageType: "sensor_msgs/NavSatFix"
});

listener.subscribe(function (message) {
    document.getElementById("lat").innerHTML = message.latitude;
    document.getElementById("lng").innerHTML = message.longitude;

    // Uncomment if you want only one message
    // listener.unsubscribe();
});