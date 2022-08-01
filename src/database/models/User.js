module.exports = (sequelize, DataTypes)=>{

    const User = sequelize.define("users", {
        userId: {
            autoIncrement: true,
            primaryKey: true,
            type:DataTypes.INTEGER
        },
        firstName:{
            allowNull: false,
            type: DataTypes.STRING
        }
     }, 
        {
        tableName: "users",
        timestamps: false
    });
    return User;
}