var express = require('express');
var Service = require('../models').Service;
var router = express.Router();

// middleware
var checkIDInput = function (req, res, next) {  
    if(isNaN(req.params.id)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkIDExist = function (req, res, next) {  
    //console.log('Check ID exist');
    Service.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Service not found');
        }
    }); 
};

router.get('/', function(req, res){
    Service.findAll().then(Service => {
        res.status(200).json(Service);
    });
});

router.post('/', function(req, res){
    Service.create({
        service_id : req.body.service_id,
        service_name : req.body.service_name,
        hourly_rate : req.body.hourly_rate
    }).then(service => {
        res.status(200).json(service);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Service.findById(req.params.id).then(service => {

        res.status(200).json(service);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Service.update({
        service_id : req.body.service_id,
        service_name : req.body.service_name,
        hourly_rate : req.body.hourly_rate
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Service.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;