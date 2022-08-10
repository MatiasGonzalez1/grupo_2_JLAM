module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("products", {
        idProduct: {
            primaryKey: true,
            autoIncrement: true,
            type:DataTypes.INTEGER
        },
        productName:{
            allowNull: false,
            type: DataTypes.STRING
        },
        idProductCategory: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        productHarvest: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        productVariety: {
            allowNull: false,
            type: DataTypes.STRING
        },
        productBreeding: {
            allowNull: false,
            type: DataTypes.STRING
        },
        productGuard: {
            allowNull: false,
            type: DataTypes.STRING
        },
        productDescription: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        productImg: {
            allowNull: false,
            type: DataTypes.STRING
        },
        productPrice: {
            allowNull: false,
            type: DataTypes.DECIMAL  
        },
        productStock: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
     }, 
        {
        tableName: "products",
        timestamps: false
    });

    Product.associate = (models) => {
        Product.belongsTo(models.ProductCategory, {
            as:"category",
            foreignKey:"idProductCategory"
        }
        ),
        Product.belongsToMany(models.purchaseDetail, {
            as:"Purchase",
            through:"itemsPurchase",
            foreignKey:"idProduct",
            otherKey:"idPurchaseDetail",
            timestamps: false
        }
      );
    };
    return Product;
}