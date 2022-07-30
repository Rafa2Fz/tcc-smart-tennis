module.exports = {
  type: 'postgres',
  url: process.env.NODE_ENV === 'dev' ? process.env.LOCAL_URL : process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  extra: process.env.NODE_ENV === 'dev' ? {} : {
    ssl: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
  entities: [
    'src/entity/**/*{.ts,.js}',
  ],
  migrations: [
    'src/migration/**/*{.ts,.js}',
  ],
  subscribers: [
    'src/subscriber/**/*{.ts,.js}',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
