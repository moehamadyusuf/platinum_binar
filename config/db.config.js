require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_DEV_USERNAME,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_NAME,
        host: process.env.DB_DEV_HOST,
        dialect: process.env.DB_DEV_TYPE,
        port: parseInt(process.env.DB_PORT, 10),
        seederStorage: "sequelize",
        seederStorageTableName: "SequelizeData",
    },
    test: {
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_TEST_HOST,
        dialect: process.env.DB_TEST_TYPE,
    },
    production: {
        username: process.env.DB_PROD_USERNAME,
        password: process.env.DB_PROD_PASSWORD,
        database: process.env.DB_PROD_NAME,
        host: process.env.DB_PROD_HOST,
        dialect: process.env.DB_PROD_TYPE,
    },
};
