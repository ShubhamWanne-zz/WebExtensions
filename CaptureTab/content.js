function mouseLeft(event) {
	browser.runtime.sendMessage({log: 'leftClick'});
}
function mouseRight(event){
	// body...
	browser.runtime.sendMessage({log: 'rightClick'});
}
function keypress(event){
	// body...
	browser.runtime.sendMessage({log: 'default'});
}

window.addEventListener('mousedown', mouseLeft, true);
window.addEventListener('contextmenu', mouseRight, true);
document.addEventListener("keypress", keypress, true);