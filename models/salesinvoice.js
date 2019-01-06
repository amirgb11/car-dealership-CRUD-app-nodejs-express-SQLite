module.exports = function(sequelize, Sequalize) {
    var SalesInvoiceSchema = sequelize.define("SalesInvoice", {
        invoice_number:{
            type : Sequalize.CHAR(20),
            allowNull : false , 
            primaryKey : true
        },
        invoice_date:{
            type : Sequalize.DATE,
            allowNull : true , 
        }

    },{
        timestamps: false
    });

    SalesInvoiceSchema.associate = (models) => {
        models.SalesInvoice.hasOne(models.SalesPerson , { as : 'SoldBy'})
        models.SalesInvoice.belongsTo(models.Customer , { as : 'SoldTo'})
    }


    return SalesInvoiceSchema;
}