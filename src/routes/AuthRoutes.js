const BaseRoute = require("./base/baseRoute");
const Joi = require("@hapi/joi");

class AuthRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  login() {
    return {
      path: "/auth",
      method: "GET",
      config: {
        tags: ["api"],
        description: "Users' Authentication",
        notes: "Realiza O Login De Um User"
      },
      handler: (req, headers) => {
        return this.db.read();
      }
    };
  }

  register() {
    return {
      path: "/auth",
      method: "POST",
      config: {
        tags: ["api"],
        description: "Users' Register",
        notes: "Cadastra Um User Por Nome, Email e Senha",
        validate: {
          failAction: (request, h, err) => {
            throw err;
          },
          payload: {
            name: Joi.string()
              .max(100)
              .required(),
            email: Joi.string()
              .max(100)
              .required()
              .email(),
            password: Joi.string().max(100).required()
          }
        }
      },
      handler: (request, headers) => {
        const payload = request.payload;
        return this.db.create(payload);
      }
    };
  }

  delete() {
    return {
      path: "/auth/{id}",
      method: "DELETE",
      config: {
        tags: ["api"],
        description: "Users' Remove",
        notes: "Remove Um User Por ID",
        validate: {
          failAction: (request, h, err) => {
            throw err;
          },
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: (request, headers) => {
        const id = request.params.id;
        return this.db.delete(id);
      }
    };
  }
}

module.exports = AuthRoutes;
