module.exports = (sequelize, DataTypes) => {

    const PurchaseDetail = sequelize.define("purchaseDetail", {
        idPurchaseDetail: {
            primaryKey: true,
            autoIncrement: true,
            type:DataTypes.INTEGER
        },
        idUser:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        totalPrice: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        userAddress: {
            allowNull: false,
            type: DataTypes.STRING
        },
        productVariety: {
            allowNull: false,
            type: DataTypes.STRING
        },
        idCity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        purchaseDate: {
            allowNull: false,
            type: DataTypes.DATE
        },
        idItemPurchase: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
     }, 
        {
        tableName: "purchasedDetail",
        timestamps: false
    });

    PurchaseDetail.associate = (models) => {
        //Relacion 1:N
      PurchaseDetail.belongsTo(models.Users, {
        as:"purchaseUser",
        foreignKey:"idUser",
      });

      //Relacion 1:N
      PurchaseDetail.belongsTo(models.Cities, {
        as:"purchaseCity",
        foreignKey:"idCity",
      });

      PurchaseDetail.belongsToMany(models.Product, {
        as:"purchaseProduct",
        through:models.itemPurchases,
        foreignKey:"idPurchaseDetail",
        otherKey:"idProduct",
        timestamps: false
    })
    };
    return PurchaseDetail;
}