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
        },
        userFloor:{
            allowNull: true,
            type: DataTypes.STRING
        }
     }, 
        {
        tableName: "users",
        paranoid:true,
        deletedAt: 'softDelete',
        createdAt: 'createAt',
        updatedAt: 'modifiedAt'
    });

    
    User.associate = (models) =>{
        //cada que declaramos una relacion usamos tabla.larelacion(models.ELALIASQUELEASIGNAMOS) -- de lo contrario sequelize no encuentra la tabla 
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
        User.hasMany(models.PurchaseDetail,
            {
                as: "userPurchase",
                foreignKey: "idUser"
            }
        );
    };
    return User;
}