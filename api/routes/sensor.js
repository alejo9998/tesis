var express = require('express');
var router = express.Router();
const Dato = require('../entities/dato');
const Sensor = require('../entities/sensor')
var gatewayEntity = require('../entities/Gateway')
const myDataSource = require('../typeorm');
const { In } = require('typeorm');
const Variable = require('../entities/Variable');

const manager = myDataSource.createEntityManager();

router.get('/', async function (req, res, next) {
    res.send(await manager.find(Sensor))
})
router.get('/:idsensor', async function (req, res, next) {
    const take = req.query.take ?? 20
    const skip = req.query.skip ?? 0
    const varName = req.query.varName

    const datosQuery = manager.createQueryBuilder(Dato, 'dato')
    .leftJoin('dato.sensor', 'sen')
    .leftJoinAndSelect('dato.variable','var')
    .where('sen.id = :sensorId', {sensorId: req.params.idsensor })
    .orderBy('dato.timestamp', 'DESC')
    .take(take)
    .skip(skip)

    if(varName) datosQuery.andWhere('var.name = :varName',{varName})

    const [ sensors,datos] = await Promise.all([
        manager.findOne(Sensor, {where: { id: req.params.idsensor } }),
        datosQuery.getMany()
    ])
    //const response = await manager.createQueryBuilder(Gateway, 'gate').joi('gate.sensores', 'sen').getMany()
    res.send({...sensors, datos: datos.map(d => {
        return {
            id: d.id,
            timestamp: d.timestamp,
            dato: d.dato,
            unidad: d.variable.unidad
        }
    })})
})

module.exports = router;