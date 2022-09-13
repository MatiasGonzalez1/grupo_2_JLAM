const db = require('../../database/models');
const {Op} = require('sequelize');

let dataSet = (respuesta, array) => {
    respuesta.forEach((producto) => {
      array.push({  
        id: producto.idProduct,
        name:producto.productName,
        description:producto.productDescription,
        category: producto.idProductCategory,
        detail: `http://localhost:3001/api/product/${producto.idProduct}`,
      });
    });
  };

const productsAPIController = {
    loadProducts: (req, res)=>{ //listado de productos   
        db.Product.findAll()
            .then((products)=>{
            // Creo un array que contendrá a cada usuario
                let datos = [];
                dataSet(products, datos);   
                return res.json({
                    status: 200,
                    count: products.length,
                    countByCategory: '',
                    products:datos
                })
            })
            ;
},  

    'ProductData': (req, res)=>{ //datos de producto por id
        
    }

}

module.exports = productsAPIController