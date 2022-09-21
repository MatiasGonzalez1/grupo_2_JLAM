const db = require('../../database/models');
const {Op, QueryTypes} = require('sequelize');
const { sequelize } = require('../../database/models'); //se requiere sequelize para operaciones con raw queries

//se crea función para setear datos
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

const productsAPIController = {
  
  loadProducts: async(req, res)=>{ //listado de productos | el cb debe ser asíncrono para usar raw queries
    const countBy = await sequelize.query("SELECT ProductCategory.productCategoryName, SUM(Products.productStock) AS Stock FROM `ProductCategory` INNER JOIN `Products` ON ProductCategory.idProductCategory = Products.idProductCategory GROUP BY ProductCategory.productCategoryName", {
      type: QueryTypes.SELECT })  
      db.Product.findAll()
      .then((products)=>{
      // Creo un array que contendrá a cada usuario
          let datos = [];
          dataSet(products, datos);   
          //se pasan los datos finales al objeto para la respuesta
            return res.json({
              status: 200,
              count: products.length,
              countByCategory: countBy, //se usa la consulta de la raw query
              products:datos,
          })
      })
      .catch(error => res.send(error));
      ;
  },  

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
            productImg: product.productImg,
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
    },
    lastAdded: (req, res)=>{
      db.Product.findAll({
        attributes:['idProduct', 'productName', 'productPrice', 'productStock'], 
        order: [['idProduct', 'DESC']],
        limit: 7
      })
      .then(lastProducts =>{
        res.json(lastProducts);
      })
      .catch(error => res.send(error));
    },
};

module.exports = productsAPIController