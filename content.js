chrome.runtime.sendMessage({action: 'loadNotes'}, response => {
  if (response.notes && response.notes[response.url]) {
    htmls = response.notes[response.url];
    htmls.forEach(html => {
      note = $(html[0]);
      text = html[1];
      note.find('.note-text').val(text);
      applyListeners(note);
      $('body').prepend(note);
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'createNote') {
    note = $('<div><textarea class=\'note-text\'></textarea></div>');
    moveBar = $('<div class=\'move-bar\'></div>');
    deleteIcon = $('<img src=\'https://cdn0.iconfinder.com/data/icons/basic-ui-elements-plain/385/010_x-512.png\'></img>');
    deleteIcon.addClass('delete');
    moveBar.append(deleteIcon);
    note.prepend(moveBar);
    note.addClass('nb-note');
    note.css('top', '0');
    note.css('left', '100%');
    note.css('transform', 'translateX(-136px)');
    note.css('zIndex', '1000000');
    applyListeners(note);
    $('body').append(note);
    updateNotes();
  }
});


let clientX, clientY;
let movingNote;
window.addEventListener('mouseup', mouseUp);

function mouseDown (e) {
  e.preventDefault();
  movingNote = $(e.target).parent();
  clientXTracker = e.clientX;
  clientYTracker = e.clientY;
  window.addEventListener('mousemove', drag);
}

function mouseUp (e) {
  e.preventDefault();
  window.removeEventListener('mousemove', drag);
  updateNotes();
}

function drag (e) {
  e.preventDefault();
  currTop = parseInt(note.css('top'));
  currLeft = parseInt(note.css('left'));
  diffTop = e.clientY - clientYTracker;
  diffLeft = e.clientX - clientXTracker;
  clientYTracker = e.clientY;
  clientXTracker = e.clientX;
  newTop = currTop + diffTop;
  newLeft = currLeft + diffLeft;
  movingNoteWidth = parseInt(movingNote.css('width'));
  movingNoteRight = parseInt(movingNote.css('right'));
  movingNoteHeight = parseInt(movingNote.css('height'));
  bodyWidth = parseInt($('body').css('width'));
  bodyHeight = parseInt($('body').css('height'));
  if (newTop > -1 &&
      newTop < bodyHeight - movingNoteHeight + 40 &&
      newLeft > movingNoteWidth - 5 &&
      newLeft < bodyWidth + 2) {
    movingNote.css('top', newTop.toString() + 'px');
    movingNote.css('left', newLeft.toString() + 'px');
  }
}

function removeNote (e) {
  if (window.confirm('Are you sure you want to delete this note?')) {
    $(e.target.parentElement.parentElement)[0].remove();
  }
  updateNotes();
}

function updateNotes () {
  htmls = [];
  notes = $('.nb-note');
  clone = notes.clone();
  clone.each(el => {
    text = $(clone[el]).find('.note-text').val();
    html = $('<div>').append(clone[el]).html();
    subArr = [html, text];
    htmls.push(subArr);
  });
  chrome.runtime.sendMessage({notes: htmls, action: 'updateNotes'});
}

function applyListeners (note) {
  note.find('.move-bar').on('mousedown', mouseDown);
  note.find('.delete').on('click', removeNote);
  note.find('.note-text').on('change keyup paste', updateNotes);
}
