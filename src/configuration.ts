export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.MONGO_DB_CONNECTION_STRING,
        port: parseInt(process.env.MONGO_DB_CONNECTION_STRING, 10) || 5432
    }
});