var id = 100;

// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function () {

    chrome.tabs.captureVisibleTab(function (screenshotUrl) {
        console.log("screenshoturl :" + screenshotUrl);
        var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
        var targetId = null;

        chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
            var pageResolutionTobeTested = [
                {"height": 800, "width": 800},
                {"height": 600, "width": 600},
                {"height": 400, "width": 400}
            ];

            function getScreenShootForSize(pageInfo) {
                chrome.windows.getCurrent(function (wind) {
                    var updateInfo = {
                        left: 0,
                        top: 0,
                        width: pageInfo["width"],
                        height: pageInfo["height"]
                    };
                    chrome.windows.update(wind.id, updateInfo);
                });

                chrome.tabs.onUpdated.removeListener(listener);
                var views = chrome.extension.getViews();
                for (var i = 0; i < views.length; i++) {
                    var view = views[i];
                    if (view.location.href == viewTabUrl) {
                        view.addScreenShot(pageInfo, screenshotUrl);
                        break;
                    }
                }
            }


            if (tabId != targetId || changedProps.status != "complete") {
                return;
            }
            for (index in pageResolutionTobeTested) {
                getScreenShootForSize(pageResolutionTobeTested[index]);
            }


        });

        chrome.tabs.create({url: viewTabUrl}, function (tab) {
            targetId = tab.id;
        });
    });
});
