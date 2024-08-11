# atlas-the-joy-of-painting-api

Project Context: Develop an ETL process to consolidate data from various sources into a single database, focusing on "The Joy of Painting" episodes. The goal is to create a database enabling users to filter episodes by broadcast month, subject matter, and color palette. This involves designing the database schema, extracting data from different formats, transforming it for consistency and completeness, and loading it into the database. Additionally, you'll build an API to allow users to access and filter the episode data.

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
psql -U username -d databasename -h hostname
```

## To run unittest

``` bash
npm run test
```

## Directory File Tree

```bash
.
├──  models
│   ├── color_queries.sql
│   ├── episode_queries.sql
│   └── subject_queries.sql
├── Dockerfile
├── Makefile
├── README.md
├── api
│   └── routes.js
├── database
│   └── schema.sql
├── datasets
│   ├── colors_used.csv
│   ├── episode_dates
│   └── subject_matter.csv
├── docker-compose.yml
├── make.log
├── node_modules
├── package-lock.json
├── package.json
├── public
│   └── UML
│       └── joy_of_painting_UML.png
├── server.js
├── start.sh
└── test
    └── api.test.js
```
