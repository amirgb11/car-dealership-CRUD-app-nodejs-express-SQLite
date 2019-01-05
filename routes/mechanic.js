var express = require('express');
var Mechanic = require('../models').Mechanic;
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
    Mechanic.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Mechanic not found');
        }
    }); 
};

router.get('/', function(req, res){
    Mechanic.findAll().then(mechanic => {
        res.status(200).json(mechanic);
    });
});

router.post('/', function(req, res){
    Mechanic.create({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }).then(mechanic => {
        res.status(200).json(mechanic);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Mechanic.findById(req.params.id).then(mechanic => {

        res.status(200).json(mechanic);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Mechanic.update({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Mechanic.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;