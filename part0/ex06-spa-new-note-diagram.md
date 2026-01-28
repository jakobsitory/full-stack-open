``` mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: The initial pageload of the SPA was successfull
    Note left of browser: The browser executes the function that <br/>creates a new note locally, <br/>adds it to the DOM, <br/>calls the function to redraw the notes and <br/>sends the note to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{ content: "0.6 new note", date: "2026-01-28T00:12:46.543Z" }, ... ]
    deactivate server
```