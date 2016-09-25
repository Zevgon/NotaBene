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
        chrome.storage.sync.get('notes', data => {
          sendResponse({notes: data.notes, url: sender.url});
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
  chrome.storage.sync.get('notes', data => {
    if (data && data.notes) {
      currentNotes = data.notes
    }
    if (currentNotes) {
      currentNotes[url] = notes;
    } else {
      currentNotes = {};
      currentNotes[url] = notes;
    }
    chrome.storage.sync.set(
      {
        notes: currentNotes
      }
    );
  });
}
