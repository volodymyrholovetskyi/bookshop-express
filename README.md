# Book Shop Mickroservice

- [General info](#general-info)
- [Experiments](#experiments)
- [Technologies](#technologies)
- [Set-up](#set-up)

## General Info

The domain model in the project is described by three entities `Customer`, `Order` and `Book`.

## Experiments

To avoid sorting all the collection items in memory and to speed up the query, I added an index on the datePublished field.
To compare the performance, I took screenshots:

1. Without Index:

   ![](./plan_query/without_index.png)

2. With Index:

   ![](./plan_query/use_index.png)

   As you can see, the `executionTimeMillis` of a query using indexes gives a greater increase in performance.

## Technologies

- Express

- TypeScript

- HTTP Client

- MongoDB

- Mocha, Chai, Sinon

- Docker

## Set-up
- run mongodb in docker container, command: `docker-compose up -d`
- run app, command: `npm run start`
