var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "dato", // Will use table name `category` as default behaviour.
    tableName: "dato", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        timestamp: {
            type: "varchar"
        },
        dato: {
            type: "varchar",
        },
    },

    relations: {
        variable: {
            target: "variable",
            type: "many-to-one",
            joinTable: true,
        },
        sensor: {
            target: "sensor",
            type: "many-to-one",
            joinTable: true,
        }
    },
})