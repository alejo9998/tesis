var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "gateway", 
    tableName: "gateway", 
    columns: {
        id: {
            primary: true,
            type: "varchar"
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
        sensores: {
            target: "sensor",
            type: "many-to-many",
            joinTable: true,
        },
    }
})