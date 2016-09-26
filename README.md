## NotaBene

### Background

NotaBene is a Chrome extension that makes it possible to put sticky notes on web pages. The notes are stored on the client side using Chrome's storage API, allowing the notes to persist over multiple browser life cycles.

### Implementation

NotaBene has a simple structure, using JavaScript and a minified version of jQuery. The manifest.json file holds information about the workings of the extension, like what files to execute, what permissions to allow, and what URLs to match. The content.js script communicates with and manipulates the DOM for rendering the notes. It sends and receives messages with the background script, where the logic for storing notes lives.

### Usage

Simply click on the browser action icon and a the note appears. Write whatever you want on the note and it saves automatically, as demonstrated below:

![demo](./docs/nb_demo_movie_gif.gif)

### Technical Challenges

The main challenge of this project was saving the notes in storage. Chrome storage cannot save jQuery objects, so what I did was get the html and the text of each note and save those. When the user navigates to a page with notes on it, I grab the html and text for the appropriate notes from storage, convert them back into jQuery objects, and add them back to the DOM.

Another challenge was implementing the dragging feature, which involved analyzing mouse movement and manipulating the CSS of the note accordingly.
