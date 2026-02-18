# Phonebook

Contact manager with add, update, delete, and filter functionality backed by JSON Server.

## Concepts

- `useEffect` for fetching data on mount
- Axios-based service module (`services/persons.js`)
- CRUD operations (POST, PUT, DELETE)
- Notifications and error handling

## Running the Backend

```bash
npx json-server --port 3001 --watch db.json
```
