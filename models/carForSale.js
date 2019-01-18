module.exports = function(sequelize, Sequalize) {
    var CarForSaleSchema = sequelize.define("CarForSale", {
        VIN:{
            type : Sequalize.CHAR(16),
            allowNull : false,
            primaryKey : true,
            // foreign key
            references: {
                // This is a reference to another model
                model: Car,
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
        models.CarForSale.hasOne(models.SalesInvoice , { as : 'SoldCar'})
    }



    return CarForSaleSchema;
}