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
