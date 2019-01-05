var express = require('express');
var Employee = require('../models').Employee;
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
    Employee.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Employee not found');
        }
    }); 
};

router.get('/', function(req, res){
    Employee.findAll().then(employee => {
        res.status(200).json(employee);
    });
});

router.post('/', function(req, res){
    Employee.create({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }).then(employee => {
        res.status(200).json(employee);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Employee.findById(req.params.id).then(employee => {

        res.status(200).json(employee);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Employee.update({
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
    Employee.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;