var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "sensor", // Will use table name `category` as default behaviour.
    tableName: "sensor", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "varchar",
        },
        name: {
            type: "varchar",
        },
        lat: {
            type: "varchar",
        },
        long: {
            type: "varchar",
        },
    },

    relations: {
        variables: {
            target: "variable",
            type: "many-to-many",
            joinTable: true,
        },
        gateways:{
            target: "gateway",
            type: "many-to-many",
            joinTable: true,
        },
        datos:{
            target: "dato",
            type: "one-to-many",
            joinTable: true,
        },
    },
})