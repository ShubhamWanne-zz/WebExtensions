var tabIDs=[];
var currentTab="";
var map = new Map();

function getHostName(url){
	var hostname;
    if (url.indexOf("://") > -1){
        hostname = url.split('/')[2];
    }
    else{
        hostname = url.split('/')[0];
    }
    //to remove port number
    hostname = hostname.split(':')[0];
    //to remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function onSuccess(imageURI){
	console.log("Successful image capture");
	var capturedImages=[];
	if(currentTab!=null){
		var hostname = getHostName(currentTab.url);
		if(map.has(hostname)){ //* can be optimized
			console.log("inside if");
			capturedImages = map.get(hostname);
			capturedImages.push(imageURI);
			map.set(hostname, capturedImages);
		}else{
			console.log("inside else");
			capturedImages.push(imageURI);
			map.set(hostname,capturedImages);
		}
	}
	console.log(map);
}

function onError(error){
	console.log("Error !");
	console.log(error);
}
browser.runtime.onMessage.addListener(function(request,sender,response){
	switch(request.log){
		case "leftClick": 
			console.log("left click encountered");
			var capturedTab = browser.tabs.captureVisibleTab();
			capturedTab.then(onSuccess,onError);
			break;
		case "rightClick":
			console.log("right click encountered");
			var capturedTab = browser.tabs.captureVisibleTab();
			capturedTab.then(onSuccess,onError);
			break;
		default:
			console.log("keypress encountered");
			var capturedTab = browser.tabs.captureVisibleTab();
			capturedTab.then(onSuccess,onError);
			break;
	}
});

function onGot(tabInfo){
	if(tabIDs.indexOf(tabInfo.index)==-1){ //execute only if new tab is created
		if(tabInfo.url!="about:newtab" && tabInfo.status==="complete"){
			tabIDs.push(tabInfo.index);
			currentTab = tabInfo;
			console.log(tabInfo);
		}
	}else{ //if tab is activated , not created
		currentTab = tabInfo;
	}
	//just for logging purpose
	if(currentTab.url != ""){
		console.log("Current Tab is : "+currentTab.url);
	}
}

function getInfoForTab(tabs) {
	if (tabs.length > 0) {
		var gettingInfo = browser.tabs.get(tabs[0].id);
		gettingInfo.then(onGot, onError);
	}
}

//when tab is created
function tabLoaded(){
	var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(getInfoForTab, onError);
}
//when tab is activated
function tabActivated(){
	var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(getInfoForTab, onError);
}
browser.tabs.onUpdated.addListener(tabLoaded);
browser.tabs.onActivated.addListener(tabActivated);