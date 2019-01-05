module.exports = function(sequelize, Sequalize) {
    var SalesPersonSchema = sequelize.define("SalesPerson", {
        ssn: {
            type : Sequalize.CHAR(10),
            allowNull : false,
            primaryKey : true 
        },
        first_name: Sequalize.CHAR(45),
        last_name: Sequalize.CHAR(55)
    },{
        timestamps: false
    });
    return SalesPersonSchema;
}