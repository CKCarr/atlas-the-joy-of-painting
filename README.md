# atlas-the-joy-of-painting-api

## Step 1: Create Environmental Variable files

___
.env folders --
.env.app and .env.db

username, password, and database-name will be identical in each file
___
Application Environment Variables .env.app

DB_HOST=db
DB_USER=
DB_PASS=
DB_NAME=
PORT=3000
___
PostgreSQL Database Environment Variables .env.db

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
__

## Step 2: Run Docker with the following command

to run the docker-compose with makefile
use command

``` bash
make up
```

## To run API routes

``` bash
npm run dev
```

the server will listen on port 0.0.0.0
to see output of the API routes
Run server and use 127.0.0.1:3000 in browser

## To run postgres db client server

db on cli

``` bash
psql -U usernaem -d databasename -h hostname
```

## To run unittest

``` bash
npm run test
```
