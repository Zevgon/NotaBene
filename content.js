chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  let note = document.createElement('textarea');
  // note.innerHTML = 'HI!';
  // note.style.backgroundColor = 'yellow';
  // note.style.height = '100px';
  // note.style.width = '100px';
  // note.style.position = 'absolute';
  // note.style.top = '0';
  // note.style.left = '0';
  note.className = 'nb-note';
  // note.draggable = 'true';
  debugger;
  document.body.appendChild(note);

});
