# Zelin Technical Test - Étienne Gauvin

This is my project for the Zelin position application.
As requested, it's a "personnal library manager", to handle a list of books.

- [Original readme with technical/features requirements](https://github.com/Zelin-SAS/technical-test).

## Technical Stack

### REST API server with Express v5

Personnaly I would have prefered a Nest.js app since it's more modern, TypeScript-oriented, and feature-packed than Express. But during the last interview I understood that Zelin is using Express.

I chose REST over GraphQL because REST is simpler to implement with Express. In my opinion GraphQL can be interesting in environments where the frontend team works separately and changes features often, but REST is enough for this kind of small project where the frontend/backend is handled by the same person/team.

### Front-end application with Angular v19

Since it's the frontend framework used by Zelin, and also the one I'm the most specialized on.
The Angular application isn't served by the Express server but by a separated nginx server, for decoupling (easier scaling, faster server startup, etc...)

### Postgres Database

The structure of our entities (books) is predictable, simple. There is no need for a NoSQL database, which is more optimized for large/rapidly-changing/unstructured data.

## Features

- [ ] I can see the list of my books. Each book has these properties : title, author, note, last modification date, ...
- [ ] I can add a new book to the list
- [ ] I can edit a book's properties
- [ ] I can delete a book from the list

### Optionnal features

- [ ] Multi-user
- [ ] Search feature
- [ ] Responsive interface
