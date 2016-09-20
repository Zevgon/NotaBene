document.addEventListener('DOMContentLoaded', () => {
  let createNote = document.getElementById('create-note');
  createNote.addEventListener('click', () => {
    chrome.tabs.getSelected(null, function(tab) {
      // Send a request to the content script.
      chrome.tabs.sendRequest(tab.id, {action: "createNote"});
    });
  });

});
