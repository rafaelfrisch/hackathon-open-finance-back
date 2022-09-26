# hackathon-open-finance-back
REST API using Nodejs, Javascript, Prisma and PostgreSQL database:
http://3.84.119.94/api

## Setup

Create a local PostgreSQL database and provide the url on a .env file (follow the .env.example) and run the following commands

```
npm install
npm run generate
npm run migrate
```

### Run prisma studio

Prisma studio is a visual editor for the data in your database:

```
npm run studio
```
