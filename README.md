# Node.js sequelize express CRUD
Node.js CRUD application based on the SQLite database design and Express.js framework

This Node.js CRUD code use 
- Express.js framework
- SQLite database
- sequelize ORM
- dotenv module for setting environment
```
npm install 

npm start
```

## Database

The application connect to SQLite database using sequalize. The configuration of database added in `models/index.js`. 

```
var sequelize = new Sequelize('example', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    // SQLite database path
    storage: './data/database.sqlite'
});
```

Initialize the configuration and connect to database on `app.js`.
```
var models = require("./models");

models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});
```

This app use database named `CarDealershipDB` and `car` , `carForSale` ,`carWithOwner` , `customer` , `employee` , `mechanic` , `parts` , `salesinvoice` , `salesperson` , `service`  , `serviceticket` tables  

## Route
Create `routes` folder on the root path and put route file there. After that initialiaze and register route file path on `app.js` file.

```
var employee = require('./routes/employee');

app.use('/employee', employee);
```

