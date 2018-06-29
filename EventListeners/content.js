var mouseEventIndex = -1;

function mouseDown(event) {
		console.log("executing mousedown");
	if (mouseEventIndex != 0) {
		browser.runtime.sendMessage({log: 'mouseDown'});
	}
	mouseEventIndex = 0;
}

function contextMenu(event) {
		console.log("executing contextmenu");
	if (mouseEventIndex != 3) {
		browser.runtime.sendMessage({log: 'contextMenu'});
	}
	mouseEventIndex = 3;
}

function toUtf(asciiKeyCode) {
	var utfKeyCode = "";
	if (asciiKeyCode < 128) {
        utfKeyCode += asciiKeyCode;
    }
    else if((asciiKeyCode > 127) && (asciiKeyCode < 2048)) {
        utfKeyCode += (asciiKeyCode >> 6) | 192;
        utfKeyCode += (asciiKeyCode & 63) | 128;
    }
    else {
        utfKeyCode += (asciiKeyCode >> 12) | 224;
        utfKeyCode += ((asciiKeyCode >> 6) & 63) | 128;
        utfKeyCode += (asciiKeyCode & 63) | 128;
    }
	return utfKeyCode;
}

function keypress(event) {
	console.log("executing keypress");
	event = event || window.event;
	var keyCode = event.which || event.keyCode;
	//browser.runtime.sendMessage({log: keyCode});
	browser.runtime.sendMessage({log: toUtf(keyCode)});
}

window.addEventListener('mousedown', mouseDown, true);
window.addEventListener('contextmenu', contextMenu, true);
document.addEventListener("keypress", keypress, true);