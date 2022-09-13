const db = require('../../database/models');
const {Op} = require('sequelize');

let dataProduct = (respuesta, array) => {
    respuesta.forEach((producto) => {
      array.push({
        id: producto.idProduct,
        productName: producto.productName,
        productHarvest: producto.productHarvest,
        productVariety: producto.productVariety,
        productPrice: producto.productPrice,
        detail: `http://localhost:3001/api/product/${producto.idProduct}`,
      });
    });
  };

const productAPIController = {

    'loadProducts': (req, res)=>{ //listado de productos

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
              idProductCategory: product.idProductCategory,
              productHarvest: product.productHarvest,
              productVariety: product.productVariety,
              productDescription: product.productDescription,
              productPrice: product.productPrice,
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

module.exports = productAPIController