# Salary Hero
Salary Hero Challenge app.

## Requirements
- [Docker](https://www.docker.com/) v9 or newer
- [Docker compose](https://docs.docker.com/compose/) v2 or newer
- [NodeJS](https://nodejs.org/en) v16 -> v18 LTS
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/) v1.22.x

## Installation
- Install your project dependencies
```bash
$ yarn install
```
- Setup environment
```bash
cp .env.example .env
```

## Quick start
- Initialize database container
```bash
docker compose up -d
```
- To stop containers, run
```bash
docker compose down
```

## Running the app
```bash
# Watch mode
yarn run start:dev
```

## Migrations
To update database schema, you have to use migrations
- Create migration file
```bash
yarn migration:create src/migrations/<file name>
```
- Apply those changes to database
```bash
yarn migration:up
```
- Revert those changes
```bash
yarn migration:down
```
