module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("Product", {
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
        paranoid:true,
        deletedAt: 'softDelete',
        createdAt: 'createAt',
        updatedAt: 'modifiedAt'
    });

    Product.associate = (models) => {
        //cada que declaramos una relacion usamos tabla.larelacion(models.ELALIASQUELEASIGNAMOS) -- de lo contrario sequelize no encuentra la tabla 
        Product.belongsTo(models.ProductCategory, {
            as:"category",
            foreignKey:"idProductCategory"
        }
        ),
        Product.belongsToMany(models.PurchaseDetail, {
            as:"Purchase",
            through: models.itemPurchases,
            foreignKey:"idProduct",
            otherKey:"idPurchaseDetail",
            timestamps: false
        }
      );
    };
    return Product;
}