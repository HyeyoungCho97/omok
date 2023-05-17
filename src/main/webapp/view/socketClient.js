var roomId = new URL(window.location.href).searchParams.get("roomId");
const webSocket = new WebSocket("ws://localhost:8080/omok/websocket/" + roomId);

const user_id=document.getElementById("user");
const messageTextArea = document.getElementById("messageTextArea");

let start=0;

webSocket.onopen = function(message) {
	
    messageTextArea.value += "Server connect...\n";
  };
  
webSocket.onclose = function(message) {
     
    messageTextArea.value += "Server Disconnect...\n";
};
   
webSocket.onerror = function(message) {
      
   	messageTextArea.value += "error...\n";
};
   
webSocket.onmessage = function(message) {
     
    console.log(message.data);
    
    let received = JSON.parse(message.data);
	if(received.type == 1) selectedStone(received);
    
};

/** 
{ 	
	"room": roomNumber
	"id" : user_id //사용자 id
	"type": 1	//ready
	"stone": 1 or 2 // "color"
}

*/

function sendMessage(message) {
    webSocket.send(message);
  }
  /*
$('#btn_ready').addEventListener(
	"click",
	function (evt) {
		console.log(evt)
		let message = {};
		message.id = user_id.value;
		message.type = 1;
		sendMessage(JSON.stringify(message));
	},
	false
);
*/

function btn_ready(stone){

	let message = {};
	message.id = user_id.value;
	message.type = 1;
	message.stone = stone;
	sendMessage(JSON.stringify(message));
}


//선택된 돌 disabled
function selectedStone(message){
	//console.log(message);
	const black_btn=document.getElementById("r-btn1");
	const white_btn=documetn.getElementById("r-btn2");
	
	if(message.black == user_id || message.white== user_id){
		black_btn.disabled = true;
		white_btn.disabled = true;
	}
	if(message.black!=null) {
		black_btn.innerText =  message.settedUser+" "+ready_btn.innerText;
		black_btn.disabled = true;
	}
	if (message.white!=null) {
		white_btn.innerText =  message.settedUser+" "+ready_btn.innerText;
		white_btn.disabled = true;
	}

}

function addEvent(){
	
	board.addEventListener(
	  "mousemove",
	  function (evt) {
	    var mousePos = getMousePos(board, evt);
	    drawNotClicked(mousePos.x, mousePos.y);
	  },
	  false
	);
	board.addEventListener(
	  "mousedown",
	  function (evt) {
	    var mousePos = getMousePos(board, evt);
	    isClicked(mousePos.x, mousePos.y);
	  },
	  false
	);

}