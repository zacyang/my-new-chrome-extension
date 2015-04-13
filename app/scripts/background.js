
var id = 100;

// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function() {

    chrome.tabs.captureVisibleTab(function(screenshotUrl) {
        console.log("screenshoturl :" + screenshotUrl);
        var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
        var targetId = null;

        chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
            if (tabId != targetId || changedProps.status != "complete")
                return;

            chrome.tabs.onUpdated.removeListener(listener);

            var views = chrome.extension.getViews();
            for (var i = 0; i < views.length; i++) {
                var view = views[i];
                if (view.location.href == viewTabUrl) {
                    view.setScreenshotUrl(screenshotUrl);
                    break;
                }
            }
        });

        chrome.tabs.create({url: viewTabUrl}, function(tab) {
            targetId = tab.id;
        });
    });
});
