chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if (tab.url.indexOf("https://tweetdeck.twitter.com/") != -1) {
      chrome.tabs.executeScript(null,
        {file: 'jquery-3.3.1.min.js'}, function() {
          let settings = JSON.parse(localStorage.getItem("settings"));
          if (settings == null) return;
          if (("enable" in settings) == false) return;
          if (settings.enable == "2") return;

          var list = settings.items;
          chrome.tabs.executeScript(null,
            {
              code: "var items = " + JSON.stringify(list)
            }, function() {
              chrome.tabs.executeScript(tab.id, {file: 'content_script.js'});
            });
        });
    }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.method) {
    case 'getSettings':
      let data = JSON.parse(localStorage.getItem("settings"));
      sendResponse({settings: data});
      break;
    case 'setSettings':
      localStorage.setItem("settings", JSON.stringify(request.settings));
      sendResponse();
      break;
  }
});
