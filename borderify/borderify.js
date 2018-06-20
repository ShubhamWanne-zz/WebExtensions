const CSS = "body { border: 20px solid red; }";
const TITLE_APPLY= "Apply CSS";
const TITLE_REMOVE= "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:","https:"];

function toggleCSS(tab){

	function gotTitle(title){
		if(title == TITLE_APPLY){
		  browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.png"});
	      browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
	      browser.tabs.insertCSS({code: CSS});
		}else{
			browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.png"});
	      	browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
	      	browser.tabs.removeCSS({code: CSS});
		}
	}

	var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
	gettingTitle.then(gotTitle);
}

function isProtocolApplicable(url){
	var anchor = document.createElement('a');
	anchor.href  = url;
	return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

function initializePageAction(tab){
	if(isProtocolApplicable(tab.url)){
		browser.pageAction.setIcon({
			tabId: tab.id,
			path: "icons/off.png"
		});
		browser.pageAction.setTitle(){
			tabId: tab.id,
			title: TITLE_APPLY
		}
		browser.pageAction.show(tab.id);
	}
}

/*
When first loaded, intialize page action for all the tabs
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs)=> {
	for(let tab of tabs){
		initializePageAction(tab);
	}
})
/*
Each time the tab is updated reset page action for the tab
*/
browser.tabs.onUpdated.addListener((id,changeInfo,tab)=>{
	initializePageAction(tab);
});

browser.pageAction.onClicked.addListener(toggleCSS);
