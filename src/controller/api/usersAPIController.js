const db = require("../../database/models");
const { Op } = require("sequelize");

// creo una funcion para setear los datos de c/usuario que llega de la DB
// controlo los datos que se envian en la response eliminando datos sensibles

let dataSet = (respuesta, array) => {
  respuesta.forEach((usuario) => {
    array.push({
      id: usuario.userId,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      email: usuario.userEmail,
      detail: `http://localhost:3001/api/users/${usuario.userId}`,
    });
  });
};

const userAPIController = {
  loadUsers: (req, res) => {
    //listado de usuarios
    db.Users.findAll()
      .then((users) => {
        // Creo un array que contendrá a cada usuario
        let datos = [];
        // Llamo a la funcion que setea los datos
        dataSet(users, datos);
        // creo un objeto para la response con los datos finales
        let usuarios = {
          status: 200,
          count: users.length,
          data: datos,
        };

        res.json(usuarios);
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

  userData: (req, res) => {
    //datos de usuario por id

    db.Users.findByPk(Number(req.params.id))
      .then((user) => {
        // creo un objeto para la response con los datos finales
        let usuario = {
          status: 200,
          data: {
            id: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.userEmail,
            imgPath: `/img/profileImages/${user.userImg}`,
            detail: `http://localhost:3001/api/users/${user.userId}`,
          },
        };

        res.json(usuario);
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
};

module.exports = userAPIController;
