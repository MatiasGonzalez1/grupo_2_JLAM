module.exports = (sequelize, DataTypes)=>{


    const UserCategory = sequelize.define("userCategories", {
        idUserCategory: {
            autoIncrement: true,
            primaryKey: true,
            type:DataTypes.INTEGER
        },
            userCategoryName:{
            allowNull: false,
            type: DataTypes.STRING
        }
     }, 
        {
        tableName: "userCategory",
        timestamps: false
    });

    UserCategory.associate = models =>{
        UserCategory.hasMany(models.User,
            {
                as: "user",
                foreignKey: "userCategory"
            }
        );
    };
    return UserCategory;
}