module.exports = function(sequelize, Sequalize) {
    var ServiceMechanicSchema = sequelize.define("ServiceMechanic", {
        service_id : {
            type : Sequalize.CHAR(16),
            allowNull : false,
                // foreign key
                references: {
                    // This is a reference to another model
                    model: 'Employee',
                    // This is the column name of the referenced model
                    key: 'ssn',
                }
        },
        ssn : {
            type : Sequalize.CHAR(10),
            allowNull : false,
            primaryKey : true ,
            // foreign key
            references: {
                // This is a reference to another model
                model: 'Mechanic',
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