module.exports = (sequelize, DataTypes)=>{

    //Definicion del modelo usuario

    const User = sequelize.define("users", {
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
        userCategory:{
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
        zipCode:{
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
    User.associate = models =>{
        //relacion 1:N
        User.belongsTo(models.UserCategory, 
            {
                as: "userCategory",
                foreignKey: "userCategory"
            }
        );
        //relacion 1:N
        User.belongsTo(models.City, 
            {
                as: "city",
                foreignKey: "idCity"
            }
        );
        //Relacion 1:N
        User.hasMany(models.PurchaseDetail,
            {
                as: "userPurchase",
                foreignKey: "idUser"
            }
        );
    };
    return User;
}