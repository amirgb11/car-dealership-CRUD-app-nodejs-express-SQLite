module.exports = function(sequelize, Sequalize) {
    var CustomerSchema = sequelize.define("Customers", {
        customer_number:{
            type : Sequalize.CHAR(20),
            allowNull : false , 
            primaryKey : true
        },
        first_name: Sequalize.CHAR(30),
        last_name: Sequalize.CHAR(45),
        ssn: {
            type : Sequalize.CHAR(11),
            allowNull : false, 
        },
        phone_number: {
            type : Sequalize.CHAR(20),
            allowNull : false,
        },
        address : {
            type : Sequalize.CHAR(40),
            allowNull : false,
        },
        city : {
            type : Sequalize.CHAR(10),
            allowNull : false,
        },
        state : {
            type : Sequalize.CHAR(10),
            allowNull : false,
        },
        country : {
            type : Sequalize.CHAR(10),
            allowNull : false,
        },
        postal_code : {
            type : Sequalize.CHAR(6),
            allowNull : false,
        },

    },{
        timestamps: false
    });

        CustomerSchema.associate = (models) => {
            models.Customers.hasMany(models.SalesInvoices , { as : 'SoldTo'})
            models.Customers.hasMany(models.ServiceTickets , { as : 'ReceivedService'})
        }

    return CustomerSchema;
}