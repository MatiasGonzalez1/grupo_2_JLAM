module.exports = (sequelize, DataTypes)=>{

    //Definicion del modelo usuario

    const User = sequelize.define("Users", {
        userId: {
            autoIncrement: true,
            primaryKey: true,
            type:DataTypes.INTEGER
        },
        firstName:{
            allowNull: false,
            type: DataTypes.STRING
        },
        lastName:{
            allowNull: false,
            type: DataTypes.STRING
        },
        userEmail:{
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        idUserCategory:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        userBirthDate:{
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        userPassword:{
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        userImg:{
            allowNull: false,
            type: DataTypes.STRING
        },
        idCity:{
            allowNull: true,
            type: DataTypes.INTEGER
        },
        userAddress:{
            allowNull: true,
            type: DataTypes.STRING
        }
     }, 
        {
        tableName: "users",
        timestamps: false
    });

    // Relacion mediante Sequelize con las tablas correspondientes
    User.associate = (models) =>{
        //relacion 1:N
        User.belongsTo(models.userCategory, 
            {
                as: "userCategory",
                foreignKey: "idUserCategory"
            }
        );
        //relacion 1:N
        User.belongsTo(models.Cities, 
            {
                as: "city",
                foreignKey: "idCity"
            }
        );
        //Relacion 1:N
        User.hasMany(models.purchaseDetail,
            {
                as: "userPurchase",
                foreignKey: "idUser"
            }
        );
    };
    return User;
}