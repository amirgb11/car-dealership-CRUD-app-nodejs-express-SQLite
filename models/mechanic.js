module.exports = function(sequelize, Sequalize) {
    var MechanicSchema = sequelize.define("Mechanic", {
        ssn: {
            type : Sequalize.CHAR(10),
            allowNull : false,
            primaryKey : true ,
            // foreign key
            references: {
                // This is a reference to another model
                model: Employee,
                // This is the column name of the referenced model
                key: 'ssn',
            }
        },
        first_name: Sequalize.CHAR(45),
        last_name: Sequalize.CHAR(55)
    },{
        timestamps: false
    });
    return MechanicSchema;
}