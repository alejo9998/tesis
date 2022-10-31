var typeorm = require("typeorm");

const myDataSource = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tesis",
    password: "tesis",
    database: "tesis",
    synchronize: true,
    entities: [require("./entities/Gateway.js"), require("./entities/sensor.js"),require("./entities/dato.js"),require("./entities/Variable.js")],
});

module.exports = myDataSource

