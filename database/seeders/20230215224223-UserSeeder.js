"use strict";
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize").Sequelize;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Users", [
            {
                username: "mangsur",
                firstName: "komang",
                lastName: "surya",
                email: "ksuryasedana@gmail.com",
                password: bcrypt.hashSync("komang26"),
                isAdmin: true,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "bobo",
                firstName: "bobo",
                lastName: "ho",
                email: "ksuryasedana@example.com",
                password: bcrypt.hashSync("komang26"),
                isAdmin: false,
                isVerified: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
