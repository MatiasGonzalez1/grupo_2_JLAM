const db = require("../../database/models");
const { Op } = require("sequelize");

const userAPIController = {
  loadUsers: async(req, res) => {
    //listado de usuarios

    // Dicha paginacion sera determinada por la query 'page'
    // al siguiente endpoint "http://localhost:3001/api/users?page=0"
    // Por defecto (sin query) traera todos los usuarios regustrados "http://localhost:3001/api/users"
    let page = 0;
    let limit = 10
    req.query.page? page = Number(req.query.page) * 10: limit = undefined;
    const lastUser = await db.Users.findOne({
      include: [{association: 'userCategory'}],
      attributes: ["userId", "userImg","firstName","lastName","userEmail","createAt"],
      order: [ [ 'createAt', 'DESC' ]]                     
    });
    db.Users.findAll({
      attributes: [
        ["userId", "id"],
        "firstName",
        "lastName",
        ["userEmail", "email"],
      ], //Determinacion de columnas a traer de la DB
      offset: page,
      limit: limit,
    })
      .then((users) => {
        //Recorro los usuarios de la consulta y agrego la propiedad detalle
        users.forEach((usuario) => {
          usuario.dataValues.detail = `http://localhost:3001/api/users/${usuario.dataValues.id}`;
        });
        // creo un objeto para la response con los datos finales
        let usuarios = {
          status: 200,
          count: users.length,
          data: users,
          lastUser: lastUser,
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

    db.Users.findByPk(Number(req.params.id), {
      attributes: [
        ["userId", "id"],
        "firstName",
        "lastName",
        ["userEmail", "email"],
        "userImg",
      ],
    })
      .then((user) => {
        // agrego datos necesarios de usuario requerido
        user.dataValues.detail = `http://localhost:3001/api/users/${user.dataValues.id}`;
        user.dataValues.imgPath = `/img/profileImages/${user.dataValues.userImg}`;
        // creo un objeto para la response con los datos finales
        let usuario = {
          status: 200,
          data: user,
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
