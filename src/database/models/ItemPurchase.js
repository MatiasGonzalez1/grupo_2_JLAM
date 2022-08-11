module.exports = (sequelize, DataTypes)=>{
    const ItemPurchase = sequelize.define('itemPurchases',{
        idItemPurchase:{
            autoIncrement: true,
            primaryKey: true,
            type:DataTypes.INTEGER
        },
        idPurchaseDetail:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        idProduct:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        quantity:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        itemPrice:{
            allowNull: false,
            type: DataTypes.DECIMAL
        }
    },{
        tableName: "itemPurchase",
        timestamps: false
    });

    
    return ItemPurchase;
}