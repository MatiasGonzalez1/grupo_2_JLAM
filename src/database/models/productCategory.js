module.exports = (sequelize, DataTypes)=>{

    //Definicion del modelo Categoria de producto

    const ProductCategory = sequelize.define("ProductCategory", {
        idProductCategory: {
            autoIncrement: true,
            primaryKey: true,
            type:DataTypes.INTEGER
        },
        productCategoryName:{
            allowNull: false,
            type: DataTypes.STRING
        }
     }, 
        {
        tableName: "ProductCategory",
        timestamps: false
    });

    ProductCategory.associate = models =>{
        //cada que declaramos una relacion usamos tabla.larelacion(models.ELALIASQUELEASIGNAMOS) -- de lo contrario sequelize no encuentra la tabla 
        //Relacion 1:N
        ProductCategory.hasMany(models.Product,
            {
                as: "product",
                foreignKey: "idProductCategory"
            }
        );
    };
    return ProductCategory;
}