# Seed Runner Examples

This example is to show how to add a set of Prod/Dev seed runners for a given [Bison](https://github.com/echobind/bisonapp) app.

The idea here is to provide:

1. An opinionated, structured way to have Dev VS Production data for seeds
2. A consistent pattern for running seeds
3. An opinionated, structured way to leverage runners for one off scripts (eg. Production)

## Seed Data

Inside of [prisma/seeds/data](./prisma/seeds/data/) you'll find a set of helper files that include seed data sets. In this example we've include a few scenarios:

1. Skills standalone tieing to a user (Many to Many)
2. Organizations tied to a User (One to One)
3. Seeding Users Accounts

In the data examples provided, you'll see some seeds may have the same data set for Dev vs Prod (seeds.ts) while others may have a different set all together (e.g. users.ts). These data sets are divided by a simple ENV named `APP_ENV` that checks for 'production' VS 'other' (default: 'development'). In these scenarios if the yarn scripts are ran in a production environment, the data supplied to the upsert should be an array of CreateInputs for Production instead of a local Dev dataset.

In [prisma/seeds.ts](./prisma/seeds.ts) You'll see an example of dependent data as well, where we pass the seeded Organization ID down to the User seed runner for connection. While Skills on the other hand are simply linked by a `name` _(WhereUniqueInput)_ field that _**should**_ in theory be created at that time. (different use cases)

Overall, there are a few breakdowns here -- The **DATA** per environment worth seeding... and the **RUNNERS** themselves for actually hitting our database. The Runners are stand alone files that connect to prisma and attempt to run an `upsert` with the given dataset. This is important as the runners can be leveraged for one-off files as well for production add-ons.

## Seed Runners

Seed Runners...
Peering into [prisma/seeds/runnders/users.ts](./prisma/seeds/runnders/users.ts) you'll see a simple list of `userCreateData` mapping over each dataset in a simple prisma `upsert` approach. The upsert here only has a `create` defined. If a `user` record IS found with the unique `where` clause... we simply skip that record with `update: {}`. This ensures when we run our one-off scripts, production data is left unharmed. We simply `create` the records that do not exist.

## One-Off Scripts

Peering into our [package.json](./package.json) you'll see a script for `run:script` that takes a file name. This runs a script that simplly compiles and attempts to run `yarn ts-node prisma/script/{fileName}`. Assuming we've created the script in `prisma/scripts` the file will run supplying our dataset to a `seed_runner`.

In this case, we have an example for `yarn run:script add-eb-designers.ts`. This will run a one-off file adding two new designers Jane/John to the database.

## Summary

- **seed/runners/*ts**: Takes a list of `<Record>CreateInput[]` and maps through a related prisma upsert
- **seed/data/*.ts**: Using ENV `APP_ENV` exports a list of `<Record>CreateInput[]` to be supplied to a given seed runner.
- **scripts/*.ts**: One-off scripts created, passing a list of `<Record>CreateInput[]` to a given seed runner inline. Ran via `yarn run:script {fileName}`
