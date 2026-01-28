``` mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The initial pageload of the SPA was successfull
    Note right of browser: The browser executes the function that creates a new note locally, adds it to the DOM, calls the function to redraw the notes and sends the note to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{ content: "0.6 new note", date: "2026-01-28T00:12:46.543Z" }, ... ]
    deactivate server
```