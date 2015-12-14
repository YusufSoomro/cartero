module.exports = {
 "development": {
   "username": "root",
   "password": null,
   "database": "dev_sk",
   "host": "127.0.0.1",
   "dialect": "postgres"
 },
 "test": {
   "username": "root",
   "password": null,
   "database": "test_sk",
   "host": "127.0.0.1",
   "dialect": "postgres"
 },
 "production": {
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": "prod_sk",
   "host": "127.0.0.1",
   "dialect": "postgres"
 }
};