module.exports = (sequelize, DataTypes)=>{

    //Definicion del modelo Categoria de producto

    const ProductCategory = sequelize.define("categories", {
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
        tableName: "productCategory",
        timestamps: false
    });

    // Relacion mediante Sequelize con las tablas correspondientes
    ProductCategory.associate = models =>{
        //Relacion 1:N
        ProductCategory.hasMany(models.product,
            {
                as: "product",
                foreignKey: "productCategory"
            }
        );
    };
    return ProductCategory;
}