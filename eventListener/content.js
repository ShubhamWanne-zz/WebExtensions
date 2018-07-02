var mouseEventIndex = -1;

function mouseDown(event) {
	if (mouseEventIndex != 0) {
		browser.runtime.sendMessage({index: 0});
	}
	mouseEventIndex = 0;
}

/*function mouseMove(event) {
	if (mouseEventIndex != 1) {
		browser.runtime.sendMessage({log: 'mouseMove'});
	}
	mouseEventIndex = 1;
}

function mouseUp(event) {
	if (mouseEventIndex != 2) {
		browser.runtime.sendMessage({log: 'mouseUp'});
	}
	mouseEventIndex = 2;
}*/

function contextMenu(event) {
	if (mouseEventIndex != 1) {
		browser.runtime.sendMessage({index: 1});
	}
	mouseEventIndex = 1;
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
	event = event || window.event;
	var keyCode = event.which || event.keyCode;
	//browser.runtime.sendMessage({log: keyCode});
	browser.runtime.sendMessage({index : 2, keyCode: toUtf(keyCode)});
}

window.addEventListener('mousedown', mouseDown, false);
/*window.addEventListener('mousemove', mouseMove, false);
window.addEventListener('mouseup', mouseUp, false);*/
window.addEventListener('contextmenu', contextMenu, false);

document.addEventListener("keypress", keypress, true);