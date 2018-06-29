browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.log) {
      case 'mouseDown':
		console.log("Left button clicked event captured.");
      break;
      case 'contextMenu' : 
      console.log("context menu has appeared.");
      break;
	  /*case 'mouseUp':
		console.log("Left button released event captured.");
      break;*/
	  /*case 'mouseMove':
		console.log("Mouse movement event captured.");
      break;*/
	  default:
		console.log("Key event captured : " + String.fromCharCode(request.log) + ", utf : " + request.log);
      break;
    }
  }
);