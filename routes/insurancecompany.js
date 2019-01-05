var express = require('express');
var InsuranceCompany = require('../models').InsuranceCompany;
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
    InsuranceCompany.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('InsuranceCompany not found');
        }
    }); 
};

router.get('/', function(req, res){
    InsuranceCompany.findAll().then(insurancecompany => {
        res.status(200).json(insurancecompany);
    });
});

router.post('/', function(req, res){
    InsuranceCompany.create({
        company_name: req.body.company_name
    }).then(insurancecompany => {
        res.status(200).json(insurancecompany);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    InsuranceCompany.findById(req.params.id).then(insurancecompany => {

        res.status(200).json(insurancecompany);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    InsuranceCompany.update({
        company_name: req.body.company_name
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    InsuranceCompany.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;