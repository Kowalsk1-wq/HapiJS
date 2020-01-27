const server = require("./server");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const { version } = require("../package.json");
const chalk = require("chalk");
const figlet = require("figlet");

const Context = require("./db/strategies/base/ContextStrategy");
const MongoDB = require("./db/strategies/mongodb/MongoStrategy");
const UserSchema = require("./app/models/User");
const AuthRoutes = require("./routes/AuthRoutes");

const swaggerOptions = {
  info: {
    title: "Accenture GYM API Documentation",
    version
  },
  lang: "pt"
};

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

const init = async () => {
  const conn = MongoDB.connect();
  const mongo = new Context(new MongoDB(conn, UserSchema));

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.route([...mapRoutes(new AuthRoutes(mongo), AuthRoutes.methods())]);

  try {
    await server.start();
    console.log(
      chalk.green(
        `${figlet.textSync(`Server Running`, {
          font: "Doom"
        })} on ${server.info.uri}`
      )
    );
  } catch (error) {
    console.error("DEU RUIM!!", error);
  }
};

init();
