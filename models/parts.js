module.exports = function(sequelize, Sequalize) {
    var PartsSchema = sequelize.define("Parts", {
        part_number:{
            type : Sequalize.CHAR(20),
            allowNull : false , 
            primaryKey : true
        },
        description : {
            type : Sequalize.TEXT(100)
        },
        purchase_price : {
            type : Sequelize.DECIMAL(10, 2)
        },
        retail_price : {
            type : Sequelize.DECIMAL(10, 2)
        }

    },{
        timestamps: false
    });
    return PartsSchema;
}