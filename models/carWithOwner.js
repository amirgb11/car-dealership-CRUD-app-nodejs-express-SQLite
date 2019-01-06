module.exports = function(sequelize, Sequalize) {
    var CarWithOwnerSchema = sequelize.define("CarWithOwner", {
        VIN:{
            type : Sequalize.CHAR(16),
            allowNull : false,
            primaryKey : true
        }, 
        model: Sequalize.CHAR(45),
        company: Sequalize.CHAR(45),
        color: Sequalize.CHAR(45)
    },{
        timestamps: false
    });

    return CarWithOwnerSchema;
}