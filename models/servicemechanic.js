module.exports = function(sequelize, Sequalize) {
    var ServiceMechanicSchema = sequelize.define("ServiceMechanics", {
        service_id : {
            type : Sequalize.CHAR(16),
            allowNull : false,
                // foreign key
                references: {
                    // This is a reference to another model
                    model: 'Services',
                    // This is the column name of the referenced model
                    key: 'service_id',
                }
        },
        ssn : {
            type : Sequalize.CHAR(10),
            allowNull : false,
            primaryKey : true ,
            // foreign key
            references: {
                // This is a reference to another model
                model: 'Mechanics',
                // This is the column name of the referenced model
                key: 'ssn',
            }
        }, 
        hours: {
            type : Sequalize.CHAR(20)
        },
        comment: {
            type : Sequalize.STRING
        },
        rate : {
            type : Sequalize.CHAR(20)
        }

           

    },{
        timestamps: false
    });
    return ServiceMechanicSchema;
}