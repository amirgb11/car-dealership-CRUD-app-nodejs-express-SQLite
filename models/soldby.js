module.exports = function(sequelize, Sequalize) {
    var SoldBySchema = sequelize.define("SoldBy", {
        invoice_number:{
            type : Sequalize.CHAR(20),
            allowNull : false , 
            primaryKey : true ,
            references: {
                // This is a reference to another model
                model: 'SalesInvoice',
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
                model: 'SalesPerson',
                // This is the column name of the referenced model
                key: 'ssn',
            }
        }

    },{
        timestamps: false
    });

    // SoldBySchema.associate = (models) => {
    //     models.SoldBy.hasOne(models.SalesPerson , { as : 'SoldBy'})
    //     models.SoldBy.belongsTo(models.Customer , { as : 'SoldTo'})
    // }


    return SoldBySchema;
}