# flight-booking-api

This is a simple flight booking API built with Bun.

## Prerequisites

- [Bun](https://bun.sh/docs/installation)

## Installation

1. Clone the repository
2. Copy .env.sample to .env and update the variables
3. Run `bun install` to install dependencies
4. Add the bellow into `src/config/config.json` file to your desired database. For example, if you want to use sqlite, change the `dialect` to `sqlite` and update the other variables.

```json
{
  "development": {
    "dialect": "sqlite",
    "storage": "./database.sqlite",
    "logging": "info",
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    },
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}
```

5. Run `bunx sequelize db:migrate` to create the tables

6. Run `bun start` to start the server

To run:

```bash
bun start
```

To run tests:

```bash
bun test
```

## Dependencies

- [Express](https://expressjs.com/)
- [Winston](https://github.com/winstonjs/winston)
- [TypeScript](https://www.typescriptlang.org/)

This project was created using `bun init` in bun v1.1.45. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
