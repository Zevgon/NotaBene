// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//   let note = document.createElement('textarea');
//   // note.innerHTML = 'HI!';
//   // note.style.backgroundColor = 'yellow';
//   // note.style.height = '100px';
//   // note.style.width = '100px';
//   // note.style.position = 'absolute';
//   // note.style.top = '0';
//   // note.style.left = '0';
//   note.className = 'nb-note';
//   // note.draggable = 'true';
//   debugger;
//   document.body.appendChild(note);
//
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  note = $('<div><textarea class=\'note-text\'></textarea></div>');
  moveBar = $('<div class=\'move-bar\'></div>');
  moveBar.on('mousedown', mouseDown);
  deleteIcon = $('<img src=\'https://cdn0.iconfinder.com/data/icons/basic-ui-elements-plain/385/010_x-512.png\'></img>');
  deleteIcon.addClass('delete');
  deleteIcon.on('click', removeNote);
  moveBar.append(deleteIcon);
  note.prepend(moveBar);
  note.addClass('nb-note');
  note.css('top', '0');
  note.css('left', '100%');
  note.css('transform', 'translateX(-136px)');
  note.css('zIndex', '1000000');
  $('body').prepend(note);
});

let clientX, clientY;
window.addEventListener('mouseup', mouseUp);
function mouseDown (e) {
  clientXTracker = e.clientX;
  clientYTracker = e.clientY;
  window.addEventListener('mousemove', drag);
}

function mouseUp (e) {
  window.removeEventListener('mousemove', drag);
}

function drag (e) {
  currTop = parseInt(note.css('top'));
  currLeft = parseInt(note.css('left'));
  diffTop = e.clientY - clientYTracker;
  diffLeft = e.clientX - clientXTracker;
  clientYTracker = e.clientY;
  clientXTracker = e.clientX;
  newTop = currTop + diffTop;
  newLeft = currLeft + diffLeft;
  moveBar.parent().css('top', newTop.toString() + 'px');
  moveBar.parent().css('left', newLeft.toString() + 'px');
}

function removeNote (e) {
  if (window.confirm('Are you sure you want to delete this note?')) {
    $(e.target.parentElement.parentElement)[0].remove();
  }
}
