module.exports = function(sequelize, Sequalize) {
    var SoldBySchema = sequelize.define("SoldBies", {
        invoice_number:{
            type : Sequalize.CHAR(20),
            allowNull : false , 
            primaryKey : true ,
            references: {
                // This is a reference to another model
                model: 'SalesInvoices',
                // This is the column name of the referenced model
                key: 'invoice_number',
            }
        },
        ssn: {
            type : Sequalize.CHAR(10),
            allowNull : false,
           // foreign key
            references: {
                // This is a reference to another model
                model: 'SalesPeople',
                // This is the column name of the referenced model
                key: 'ssn',
            }
        }

    },{
        timestamps: false
    });


    return SoldBySchema;
}