//create a context menu
browser.contextMenus.create({
	id="ddg",
	title: "search on DuckDuckGo",
	contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info,tab){
	const url = "https://duckduckgo.com/?q="+info.selectionText;
	browser.tabs.create({url: url});
}