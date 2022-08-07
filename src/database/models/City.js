module.exports = (sequelize, DataTypes)=>{

    //Definicion del modelo Ciudades

    const City = sequelize.define("cities", {
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

    // Relacion mediante Sequelize con las tablas correspondientes
    City.associate = models =>{
        //relacion 1:N
        City.hasMany(models.User, 
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