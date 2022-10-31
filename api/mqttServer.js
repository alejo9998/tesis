const mqtt = require('mqtt');
let Gateway = require('./entities/Gateway');
var typeorm = require("typeorm");
let Sensor = require('./entities/sensor');
let Variable= require('./entities/Variable');
let Dato= require('./entities/dato');

var dataSource = new typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "tesis",
  password: "tesis",
  database: "tesis",
  entities: [require("./entities/Gateway.js"), require("./entities/sensor.js"),require("./entities/dato.js"),require("./entities/Variable.js"),],
});

dataSource
    .initialize()
    .then(function () {
      console.log('Connection mqtt to db success')
    })
    .catch(function (error) {
        console.log("Error: ", error)
    })

const manager = dataSource.createEntityManager();

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'JS',
  username: '',
  password: '',
};

const client  = mqtt.connect('mqtt://157.253.205.21:1883', options);

client.on('connect', function () {
  console.log('Connected')
  client.subscribe('gateway/+/+', function (err) {
    if (!err) {
        console.log('dentro del topico');
    }
  })
})

client.on('message', async (topic, message) => {
  console.log('mensaje');
  // message is Buffer
  
  var datos=message.toString()
  var datosSep=datos.split('=')
  var variableNombre = datosSep[0]
  var valor=datosSep[1]
  var unidadVariable=datosSep[2]


  var topico=topic
  var origen=topico.split('/')
  var gatewayID = origen[1]
  var sensorID = origen[2]

  console.log("GatewayId: " + gatewayID)
  console.log("SensorId: " + sensorID)
  
  
  
  let gateway = await manager.findOne(Gateway, {where: { id: gatewayID }});
  
    if(!gateway){
        gateway = {};
        gateway.id = gatewayID;
        gateway.name = 'Gateway laboratorio';
        gateway.lat = '0';
        gateway.long = '0';
        gateway.sensores=[sensorID];
        await manager.save(Gateway, gateway);
        console.log('Saving new gateway with ID: ' + gatewayID);
    }  
    let sensor = await manager.findOne(Sensor, {where:{ id:sensorID }});

    if(!sensor){
      sensor={};
      sensor.id = sensorID;
      sensor.name = "sensor laboratorio";
      sensor.lat='0';
      sensor.long='0';
      sensor.gateways = [gateway];
      sensor.variable = variableNombre;
      await manager.save(Sensor, sensor);
      console.log('Saving new sensor with ID: ' + sensorID);
    }
    let variable = await manager.findOne(Variable, {where:{ name:variableNombre }});

    if(!variable){
        variable={};
        variable.name=variableNombre;
        variable.unidad=unidadVariable;
        variable.sensores = [sensor];
  
        await manager.save(Variable, variable);
        console.log('Saving new variable with Name: ' + variableNombre);
    }

    let dato = {};
    dato.dato = valor;
    dato.timestamp = Date.now();
    dato.variable = variable;
    dato.sensor = sensor;
    await manager.save(Dato, dato);
    
  
})
