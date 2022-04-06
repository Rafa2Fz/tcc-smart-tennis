module.exports = {
   "type": "postgres",
   "host": `${process.env.DATABASE_URL}`,
   "port": 5432,
   "username": "postgres",
   "password": "postgres",
   "database": "beach-tennis",
   "synchronize": false,
   "logging": false,
   "entities": [
      `${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/entity/**/*.ts`
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
