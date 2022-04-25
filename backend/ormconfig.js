const local = {
   "type": "postgres",
   "url": `${process.env.NODE_ENV === "dev"? process.env.LOCAL_URL: process.env.DATABASE_URL}`,
   "synchronize": false,
   "logging": false,
   "extra": `${process.env.NODE_ENV === "dev"? {}:  {
      "ssl": {
         "rejectUnauthorized": false,
       }
   }}`,
   "entities": [
     'src/entity/**/*.ts'
   ],
   "migrations": [
     'src/migration/**/*.ts'
   ],
   "subscribers": [
    'src/subscriber/**/*.ts'
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

const producao = {
   "type": "postgres",
   "url": `${process.env.NODE_ENV === "dev"? process.env.LOCAL_URL: process.env.DATABASE_URL}`,
   "synchronize": false,
   "logging": false,
   "extra": {
      "ssl": {
         "rejectUnauthorized": false,
       }
   },
   "entities": [
     'src/entity/**/*.ts'
   ],
   "migrations": [
     'src/migration/**/*.ts'
   ],
   "subscribers": [
    'src/subscriber/**/*.ts'
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

 module.exports = process.env.NODE_ENV === "dev"? local:producao