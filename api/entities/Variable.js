var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "variable", // Will use table name `category` as default behaviour.
    tableName: "variable", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        unidad: {
            type: "varchar",
        },
    },

    relations: {
        datos:{
            target: "dato",
            type: "one-to-many",
            joinTable: true,
        },
        sensores:{
            target: "sensor",
            type: "many-to-many",
            joinTable: true,
        }
    },
})