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
  note = $('<div><div class=\'move-bar\'></div><textarea class=\'note-text\'></textarea></div>');
  note.addClass('nb-note');
  note.css('top', '0');
  note.css('right', '0');
  note.css('zIndex', '1000000');
  note.css('transform', 'translate3d(-50%, -50%, 0) !important');
  note.on('mousedown', mouseDown);
  let clientX, clientY;
  window.addEventListener('mouseup', mouseUp);
  function mouseDown (e) {
    initialClientX = e.clientX;
    initialClientY = e.clientY;
    window.addEventListener('mousemove', drag);
  }
  function mouseUp (e) {
    window.removeEventListener('mousemove', drag);
  }
  function drag (e) {
    currTop = parseInt(note.css('top'));
    currRight = parseInt(note.css('right'));
    diffTop = e.clientY - initialClientY;
    diffRight = initialClientX - e.clientX;
    newTop = currTop + diffTop;
    newRight = currRight + diffRight;
    note.css('top', diffTop.toString() + 'px');
    note.css('right', diffRight.toString() + 'px');
    console.log('hi :D');
  }
  $('body').prepend(note);
});
