var socket = io.connect();
var input = document.getElementById("msgInput");
var messagesSection = document.getElementById("messagesSection");
function getTime(){
    var today = new Date();
    var seconds = today.getSeconds();
    var minutes = today.getMinutes();
    var hours = today.getHours();
    if(seconds<10){
        seconds = "0"+seconds.toString();
    }
    if(minutes<10){
        minutes = "0"+minutes.toString();
    }
    if(hours<10){
        hours = "0"+hours.toString();
    }
    return hours+":"+minutes+":"+seconds
}
function fireSocketSend(){
    var time = getTime();
    var msgTXT = input.value;
    msgTXT = msgTXT.trim();
    if(msgTXT!=""){
        socket.emit("newMsg", {"data": input.value, "time": time});
        var newMsgDiv = document.createElement("div");
        newMsgDiv.classList.add("message-blue");
        var newMsgP = document.createElement("p");
        newMsgP.classList.add("message-content");
        newMsgP.innerHTML = input.value;
        var newMsgDiv_time = document.createElement("div");
        newMsgDiv_time.classList.add("message-timestamp-right");
        newMsgDiv_time.innerHTML= time;
        newMsgDiv.appendChild(newMsgP);
        newMsgDiv.appendChild(newMsgDiv_time);
        newMsgDiv.id = time;
        messagesSection.appendChild(newMsgDiv);
        finalMsgDiv = document.getElementById(time);
        finalMsgDiv.style.marginLeft = window.screen.width- finalMsgDiv.clientWidth -40 +"px";
        window.scrollTo(0,document.body.scrollHeight);
    }
    input.value = "";
}
socket.on("newMsg",(data)=>{
    var newMsgDiv = document.createElement("div");
    newMsgDiv.classList.add("message-grey");
    var newMsgP = document.createElement("p");
    newMsgP.classList.add("message-content");
    newMsgP.innerHTML = data["data"];
    var newMsgDiv_time = document.createElement("div");
    newMsgDiv_time.classList.add("message-timestamp-right");
    newMsgDiv_time.innerHTML= data["time"];
    newMsgDiv.appendChild(newMsgP);
    newMsgDiv.appendChild(newMsgDiv_time);
    messagesSection.appendChild(newMsgDiv);
    window.scrollTo(0,document.body.scrollHeight);
})