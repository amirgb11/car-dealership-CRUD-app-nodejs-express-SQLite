module.exports = function(sequelize, Sequalize) {
    var ServiceTicketSchema = sequelize.define("ServiceTicket", {
        ticket_number : {
            type : Sequalize.INTEGER,
            allowNull : false,
            primaryKey : true , 
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

    ServiceTicketSchema.associate = (models) => {
        models.ServiceTicket.belongsTo(models.CarWithOwner , { as : 'GotServiced'})
    }

    return ServiceTicketSchema;
}