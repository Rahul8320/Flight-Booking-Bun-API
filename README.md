# flight-booking-api

This is a simple flight booking API built with Bun.

## Prerequisites

- [Bun](https://bun.sh/docs/installation)

## Installation

1. Clone the repository
2. Copy .env.sample to .env and update the variables. For example, you can refer the following

```env
  PORT=3000
  LOG_LEVEL=info
  TIMESTAMP_FORMAT=YYYY-MM-DD HH:mm:ss

  DATABASE_URL="file:./dev.db"
```

3. Run `bun install` to install dependencies
4. Run `bunx prisma migrate deploy` to update migrations
5. Run `bun start` to start the server

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
- [Prisma](https://www.prisma.io/)

  This project was created using `bun init` in bun v1.1.45. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
