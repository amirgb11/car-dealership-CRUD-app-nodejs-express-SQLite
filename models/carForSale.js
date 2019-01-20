module.exports = function(sequelize, Sequalize) {
    var CarForSaleSchema = sequelize.define("CarForSales", {
        VIN:{
            type : Sequalize.CHAR(16),
            allowNull : false,
            primaryKey : true,
            // foreign key
            references: {
                // This is a reference to another model
                model: 'Cars',
                // This is the column name of the referenced model
                key: 'VIN',
            }
        }, 
        model: Sequalize.CHAR(45),
        company: Sequalize.CHAR(45),
        color: Sequalize.CHAR(45),
        
    },{
        timestamps: false
    });

    CarForSaleSchema.associate = (models) => {
        models.CarForSales.hasOne(models.SalesInvoices , { as : 'SoldCar'})
    }



    return CarForSaleSchema;
}