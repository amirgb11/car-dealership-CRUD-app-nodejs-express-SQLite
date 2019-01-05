var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
var env = require('dotenv').load();
var port = process.env.PORT || 8000;

var models = require("./models");
var employee = require('./routes/employee');
var salesperson = require('./routes/salesperson');
var mechanic = require('./routes/mechanic');
var car = require('./routes/car');
var carForSale = require('./routes/carForSale');
var carWithOwner = require('./routes/carWithOwner');
var customer = require('./routes/customer');
var service = require('./routes/service');


models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/employee', employee);
app.use('/salesperson', salesperson);
app.use('/mechanic', mechanic);
app.use('/car', car);
app.use('/carforsale', carForSale);
app.use('/careithowner', carWithOwner);
app.use('/customer', customer);
app.use('/service', service);


app.get('/', function(req, res){
    console.log('app listening on port: '+port);
    res.send('test express nodejs sqlite')
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports = app;