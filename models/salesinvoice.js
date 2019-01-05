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
    return SalesInvoiceSchema;
}