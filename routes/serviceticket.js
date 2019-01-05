var express = require('express');
var ServiceTicket = require('../models').ServiceTicket;
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
    ServiceTicket.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('ServiceTicket not found');
        }
    }); 
};

router.get('/', function(req, res){
    ServiceTicket.findAll().then(serviceticket => {
        res.status(200).json(serviceticket);
    });
});

router.post('/', function(req, res){
    ServiceTicket.create({
        ticket_number : req.body.ticket_number,
        date_received : req.body.date_received,
        date_returned : req.body.date_returned,
        comments : req.body.comments
    }).then(serviceticket => {
        res.status(200).json(serviceticket);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    ServiceTicket.findById(req.params.id).then(serviceticket => {

        res.status(200).json(serviceticket);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    ServiceTicket.update({
        ticket_number : req.body.ticket_number,
        date_received : req.body.date_received,
        date_returned : req.body.date_returned,
        comments : req.body.comments
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    ServiceTicket.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;