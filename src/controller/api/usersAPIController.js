const db = require("../../database/models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const userAPIController = {
  loadUsers: async (req, res) => {
    //listado de usuarios

    //Año actual para calcular la edad de cada ususario
    const anoActual = new Date().getFullYear();

    // Funcion para sacar la mediana de edades
    function ArrayAvg(myArray) {
      let len = myArray.length,
        edadPromedio = 0;
      if (len % 2 == 0) {
        let firstpos = myArray[len / 2 - 1];
        let seconpos = myArray[len / 2];
        edadPromedio = (firstpos + seconpos) / 2;
      } else {
        let firstpos = len + 1;
        edadPromedio = myArray[firstpos / 2 - 1];
      }
      return edadPromedio;
    }

    // La paginacion sera determinada por la query 'page'
    // al siguiente endpoint "http://localhost:3001/api/users?page=0"
    // Por defecto (sin query) traera todos los usuarios regustrados "http://localhost:3001/api/users"
    let page = 0;
    let limit = 4;
    req.query.page ? (page = Number(req.query.page) * 4) : (limit = undefined);
    const lastUser = await db.Users.findOne({
      include: [{ association: "userCategory" }],
      attributes: [
        "userId",
        "userImg",
        "firstName",
        "lastName",
        "userEmail",
        "createAt",
      ],
      order: [["createAt", "DESC"]],
    });
    db.Users.findAll({
      attributes: [
        ["userId", "id"],
        "firstName",
        "lastName",
        ["userEmail", "email"],
        "userImg",
        [Sequelize.fn("DATE", Sequelize.col("createAt")), "createAt"],
        "userBirthDate",
        [Sequelize.fn("YEAR", Sequelize.col("userBirthDate")), "edad"], // query para tarer el año de nacimiento y calcular edad
      ], //Determinacion de columnas a traer de la DB
      offset: page,
      limit: limit,
    })
      .then((users) => {
        //Recorro los usuarios de la consulta y agrego la propiedad detalle y edad
        users.forEach((usuario) => {
          usuario.dataValues.edad = anoActual - usuario.dataValues.edad;
          usuario.dataValues.detail = `http://localhost:3001/api/users/${usuario.dataValues.id}`;
        });

        // Genero array para obtener las edades y las ordeno para calculo de mediana
        let datos = [];
        users.forEach((usuario) => {
          datos.push(usuario.dataValues.edad);
        });

        datos.sort(function (a, b) {
          return a - b;
        });

        // creo un objeto para la response con los datos finales

        let usuarios = {
          status: 200,
          count: users.length,
          data: users,
          lastUser: lastUser,
          edadPromedio: ArrayAvg(datos),
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
