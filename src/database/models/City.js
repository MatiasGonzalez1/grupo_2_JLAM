module.exports = (sequelize, DataTypes)=>{

    //Definicion del modelo Ciudades

    const City = sequelize.define("Cities", {
        idCity: {
            autoIncrement: true,
            primaryKey: true,
            type:DataTypes.INTEGER
        },
        cityName:{
            allowNull: false,
            type: DataTypes.STRING
        },
        shippingCost:{
            allowNull: false,
            type: DataTypes.DECIMAL
        }
     }, 
        {
        tableName: "cities",
        timestamps: false
    });

    City.associate = (models) =>{
        //cada que declaramos una relacion usamos tabla.larelacion(models.ELALIASQUELEASIGNAMOS) -- de lo contrario sequelize no encuentra la tabla 
        //relacion 1:N 
        City.hasMany(models.Users, 
            {
                as: "user",
                foreignKey: "idCity"
            }
        );
        //Relacion 1:N
        City.hasMany(models.PurchaseDetail,
            {
                as: "cityPurchase",
                foreignKey: "idCity"
            }
        );
    };
    return City;
}