## NotaBene

### Background

NotaBene will be a Chrome extension that makes it possible to put sticky notes on web pages. The notes will be stored on the client side using cookies, so that they will persist over multiple sessions.

### Functionality & MVP

NotaBene will allow users to:

- [ ] Attach a sticky note to web pages
- [ ] Write text on the notes
- [ ] Edit the content of the notes
- [ ] Move the note on the page
- [ ] Delete the notes

### Wireframes

![wireframes](./wireframe.png)

### Technologies & Technical Challenges

The primary tools for creating NotaBene will be Javascript, HTML and CSS. It will contain the following files:

- `package.json`: will include any required dependencies
- `manifest.json`: standard Chrome extension file, will include JSON object
- `note.js`: will include the note object to be inserted into the HTML of the webpage
- `note_style.css`: will contain the styling for the note to be rendered

The primary challenges will be:

- Figuring out how to store the note in the clients' cookies
- Allowing repositioning of the note on the page
- Figuring out how to make NotaBene available to anyone using Chrome

### Implementation Timeline

**Day 1 Goals:**

- Have a working `package.json` file
- Have a working `mainfest.json` file
- Know how to insert an element into the HTML of a webpage

**Day 2 Goals:**

- Know how to store data as a cookie on the client side
- Know how to test the extension in the browser

**Day 3 Goals:**

- Implement logic for displaying the note correctly on the page
  - CSS
  - Resizability
  - Moving the note on the page

**Day 4 Goals:**

- Fix any bugs
- Launch to Chrome extension store
