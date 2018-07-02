this.port = browser.runtime.connectNative("firefox.broker");
browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.index) {
      case 0:
	  case 1:
		sendToBroker(request.index);
      break;
	  case 2:
		sendToBroker(request.index, request.keyCode);
      break;
    }
  }
);

function sendToBroker(index, keyCode) {
	if (index == 2)
		var obj = {"index":index, "keyCode":keyCode};
	else var obj = {"index":index};
	this.port.postMessage(JSON.stringify(obj));
}

function receiveFromBroker(response) {
	var obj = JSON.parse(JSON.stringify(response));
	console.log("Response from broker : ");
	console.log(obj.text);
}

this.port.onMessage.addListener((response) => {
  receiveFromBroker(response);
});