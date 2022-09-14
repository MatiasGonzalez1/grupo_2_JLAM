const db = require('../../database/models');
const {Op, Sequelize, QueryTypes} = require('sequelize');
const { sequelize } = require('../../database/models');

let dataSet = (respuesta, array) => {
    respuesta.forEach((producto) => {
      array.push({  
        id: producto.idProduct,
        name:producto.productName,
        description:producto.productDescription,
        category: producto.idProductCategory,
        include: [{association: 'category'}],
        detail: `http://localhost:3001/api/product/${producto.idProduct}`,
      });
    });
  };

const categoria = db.ProductCategory

const productsAPIController = {
  
loadProducts: async (req, res)=>{
  const countBy = await sequelize.query("SELECT ProductCategory.productCategoryName, Products.productName FROM `ProductCategory` INNER JOIN `Products` ON ProductCategory.idProductCategory = Products.idProductCategory", {
    type: QueryTypes.SELECT })
    res.status(200).json({data:countBy});
},

    // loadProducts: (req, res)=>{ //listado de productos   
    //     db.Product.findAll()
    //         .then((products)=>{
    //         // Creo un array que contendrá a cada usuario
    //             let datos = [];
    //             dataSet(products, datos);   
    //              return res.json({
    //                 status: 200,
    //                 count: products.length,
    //                 countByCategory: '', //raw query
    //                 products:datos,
    //             })
    //         })
    //         .catch(error => res.send(error));
    //         ;
//},  

    'ProductData': (req, res)=>{ //datos de producto por id
        db.Product.findByPk(Number(req.params.id))
        .then((product) => {
          // creo un objeto para la response con los datos finales
          let producto = {
            status: 200,
            data: {
              id: product.productId,
              productName: product.productName,
              include: [{association: 'category'}],
              idProductCategory: product.idProductCategory,
              productHarvest: product.productHarvest,
              productVariety: product.productVariety,
              productBreeding: product.productBreeding,
              productGuard: product.productGuard,
              productDescription: product.productDescription,
              productPrice: product.productPrice,
              productStock: product.productStock,
              imgPath: `/img/productImg/${product.productImg}`,
              detail: `http://localhost:3001/api/product/${product.productId}`,
            },
          };
  
          res.json(producto);
        })
        .catch((error) => {
          // En caso de error respondo con un status 500
          let errores = {
            status: 500,
            error: error,
          };
          res.json(errores);
        });
    },
    ProductPage: (req, res)=>{
      let page = Number(req.query.page);
      let currentOffSet = (page - 1) * 5;

      db.Product.findAll({
        include: [{association: 'category'}],
        limit: 5,
        offset: currentOffSet
      })
      .then(response =>{
        res.json(response);
      })
      .catch(error => res.send(error));
    }
};

module.exports = productsAPIController