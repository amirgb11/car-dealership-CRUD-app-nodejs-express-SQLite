module.exports = function(sequelize, Sequalize) {
    var SalesInvoiceSchema = sequelize.define("SalesInvoices", {
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
        models.SalesInvoices.hasOne(models.SalesPeople , { as : 'SoldBy'})
        models.SalesInvoices.belongsTo(models.Customers , { as : 'SoldTo'})
    }


    return SalesInvoiceSchema;
}