// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   let note = document.createElement('h1');
//   note.innerHTML = 'Testing';
//   note.className = 'note';
//   let domInfo = {
//     total:   document.querySelectorAll('*').length,
//     inputs:  document.querySelectorAll('input').length,
//     buttons: document.querySelectorAll('button').length,
//     newEl: note
//   }
//   let link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.type = 'text/css';
//   link.href = 'note_style.css';
//   debugger;
//   if (request.action == "createNote")
//     sendResponse(note);
//   else
//     sendResponse({error: "poreiuasjpf"}); // Send nothing..
// });


chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'createNote'});
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'updateNote') {
    let currentURL;
    chrome.tabs.query({active: true}, tabs => {
      currentURL = tabs[0].url;
    });
    saveNote(request.note, currentURL);
  }
  if (request.action == 'loadNotes') {
    chrome.tabs.query({active: true}, tabs => {
      sendResponse(tabs);
    });
  }
});

function saveNote (note, url) {
  if (!url) {
    return;
  }
  let currentNotes;
  chrome.storage.sync.get({notes: 'anyString'}, data => {
    if (data.notes) {
      currentNotes = data.notes
    }

    if (currentNotes && currentNotes[url]) {
      currentNotes[url].push(note);
    } else if (currentNotes) {
      currentNotes[url] = [note];
    } else {
      return;
    }

    chrome.storage.sync.set(
      {
        notes: currentNotes
      }
    );
  });
}
