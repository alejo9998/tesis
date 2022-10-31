var express = require('express');
var router = express.Router();
const Gateway = require('../entities/Gateway');
const Sensor = require('../entities/sensor')
var gatewayEntity = require('../entities/Gateway')
const myDataSource = require('../typeorm');
const { In } = require('typeorm');

const manager = myDataSource.createEntityManager();

/* GET home page. */


router.get('/', async function (req, res, next) {
    res.send(await manager.find(Gateway))
})

router.get('/:idGateway', async function (req, res, next) {

    const [gateway, sensors] = await Promise.all([
        manager.findOne(Gateway, {where: { id: req.params.idGateway }}),
        manager.createQueryBuilder(Sensor, 'se').leftJoin('se.gateways', 'gate').where('gate.id = :gatewayId', {gatewayId: req.params.idGateway}).getMany()
    ])
    //const response = await manager.createQueryBuilder(Gateway, 'gate').joi('gate.sensores', 'sen').getMany()
    res.send({...gateway, sensors})
});



module.exports = router;