module.exports = function(sequelize, Sequalize) {
    var ServiceTicketSchema = sequelize.define("ServiceTicket", {
        ticket_number : {
            type : Sequalize.CHAR(16),
            allowNull : false,
            primaryKey : true , 
            validate : {
                notEmpty : true
            }
        },
        date_received : {
            type : Sequalize.DATE,
            allowNull : true,
        },
        date_returned : {
            type : Sequalize.DATE,
            allowNull : true,
        },
        comments : {
            type : Sequalize.TEXT(100)
        }
    },{
        timestamps: false
    });
    return ServiceTicketSchema;
}