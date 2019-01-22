module.exports = function(sequelize, Sequalize) {
    var MechanicSchema = sequelize.define("Mechanics", {
        ssn: {
            type : Sequalize.CHAR(10),
            allowNull : false,
            primaryKey : true ,
            // foreign key
            references: {
                // This is a reference to another model
                model: 'Employees',
                // This is the column name of the referenced model
                key: 'ssn',
            }
        },
        first_name: {
            type : Sequalize.CHAR(45) , 
            references: {
                // This is a reference to another model
                model: 'Employees',
                // This is the column name of the referenced model
                key: 'first_name',
            }
        },
        last_name: {
            type : Sequalize.CHAR(45) , 
            references: {
                // This is a reference to another model
                model: 'Employees',
                // This is the column name of the referenced model
                key: 'last_name',
            }
        }
    },{
        timestamps: false
    });
    return MechanicSchema;
}