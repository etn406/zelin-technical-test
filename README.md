# Zelin Technical Test - Étienne Gauvin

This is my project for the Zelin position application.
As requested, it's a "personnal library manager", to handle a list of books.

- [Original readme with technical/features requirements](https://github.com/Zelin-SAS/technical-test).

## Technical Stack Choices

### REST API server with Express v5

Personnaly I would have prefered a Nest.js app since it's more modern, TypeScript-oriented, and feature-packed than Express. But during the last interview I understood that Zelin is using Express.

I chose REST over GraphQL because REST is simpler to implement with Express. In my opinion GraphQL can be interesting in environments where the frontend team works separately and changes features often, but REST is enough for this kind of small project where the frontend/backend is handled by the same person/team.

### Front-end application with Angular v19

I went with Angular as it's the frontend framework used by Zelin, and also because the one I'm the most specialized on.
The Angular application isn't served by the Express server but by a separated nginx server, for decoupling (easier scaling, faster server startup, etc...)

### Postgres Database

The structure of our entities (books) is predictable, simple. There is no need for a NoSQL database, which is more optimized for large/rapidly-changing/unstructured data. So I went for a simple PostgreSQL database.

## Features

- [ ] I can see the list of my books. Each book has these properties : title, author, note, last modification date, ...
- [ ] I can add a new book to the list
- [ ] I can edit a book's properties
- [ ] I can delete a book from the list

### Optionnal features

- [ ] Multi-user
- [ ] Search feature
- [ ] Responsive interface

## Technical Choices

### Local / Containerized

Depending of your context, you may start the application in Docker containers for testing or production, or in your local development environment.

I do not recommend to use Docker containers for active local development in `server` or `client` folders, as it will only cause issues and slowdowns with the Node Inspector, watch mode, node modules, and complicate the configuration.

Even if you intend to setup a development environment, you still need Docker locally for the PostgreSQL database service.

#### Services from the `docker-compose.yml`

- `client` is the Angular frontend, served by nginx. It's not dependent on the `server` or `db` services to run.

- `server` is the Node / Express backend, and it's dependent on the `db` service to run.

- `db` is the PostgreSQL database service.

### Setting up the environment

Create your local `.env` file: `cp .env.example .env` and modify it to match your needs, it will be used similarly by Docker Compose or by the local development startup scripts.

### Starting the containerized stack

To start the application in a Docker container, for example for a production environment, simply build and run it using Docker compose.

```sh
docker compose build
docker compose up
```

### Starting a local development environment

#### Database

Start only the database service with:

```sh
docker compose up db
```

#### Server

To automatically start the TypeScript compiler in watch mode, and concurrently the Express server in watch mode, with the Node Inspector debugging tools:

```sh
$ cd server
$ npm run watch
```

#### Client

TODO
