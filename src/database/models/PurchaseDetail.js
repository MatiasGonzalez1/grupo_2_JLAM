module.exports = (sequelize, DataTypes) => {

    const PurchaseDetail = sequelize.define("purchaseDetails", {
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
        tableName: "products",
        timestamps: false
    });

    PurchaseDetail.associate = (models) => {
        //Relacion 1:N
      PurchaseDetail.belongsTo(models.User, {
        as:"purchaseUser",
        foreignKey:"idUser",
      });

      //Relacion 1:N
      PurchaseDetail.belongsTo(models.City, {
        as:"purchaseCity",
        foreignKey:"idCity",
      });

      PurchaseDetail.belongsToMany(models.product, {
        as:"purchaseProduct",
        through:models.itemPurchases,
        foreignKey:"idPurchaseDetail",
        otherKey:"idProduct",
        timestamps: false
    })
    };
    return Product;
}