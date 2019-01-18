module.exports = function(sequelize, Sequalize) {
    var PartsUsedSchema = sequelize.define("PartsUsed", {
        part_number:{
            type : Sequalize.CHAR(20),
            allowNull : false , 
            primaryKey : true ,
            references: {
                // This is a reference to another model
                model: 'Parts',
                // This is the column name of the referenced model
                key: 'part_number',
            }
        },
        ticket_number : {
            type : Sequalize.INTEGER,
            allowNull : false,
            primaryKey : true ,
            references: {
                // This is a reference to another model
                model: 'ServiceTicket',
                // This is the column name of the referenced model
                key: 'ticket_number',
            } 
        },
        number_used : {
            type : Sequalize.INTEGER
        },
        price : {
            type : Sequalize.INTEGER
        },

    },{
        timestamps: false
    });
    return PartsUsedSchema;
}