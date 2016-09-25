chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'createNote'});
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'updateNotes':
      saveNotes(request.notes, sender.url);
      break;
    case 'loadNotes':
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.storage.sync.get(sender.url, data => {
          sendResponse({notes: data[sender.url], url: sender.url});
        });
      });
      return true;
    default:
      return;
  }
});

function saveNotes (notes, url) {
  if (!url) {
    return;
  }
  let currentNotes;
  chrome.storage.sync.get(url, data => {
    currentNotes = {};
    currentNotes[url] = notes;
    chrome.storage.sync.set(currentNotes);
  });
}
