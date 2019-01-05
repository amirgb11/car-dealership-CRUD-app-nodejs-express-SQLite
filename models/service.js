module.exports = function(sequelize, Sequalize) {
    var ServiceSchema = sequelize.define("Service", {
        service_id : {
            type : Sequalize.CHAR(16),
            allowNull : false,
            primaryKey : true
        },
        service_name : {
            type : Sequalize.CHAR(30),
            allowNull : true,
        },
        hourly_rate : {
            type : Sequalize.CHAR(16),
            allowNull : false
        },
    },{
        timestamps: false
    });
    return ServiceSchema;
}