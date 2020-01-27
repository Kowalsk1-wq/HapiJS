const server = require('./server');
const chalk = require("chalk");
const figlet = require("figlet");

const init = async () => {
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
    console.error('DEU RUIM!!', error)
  }
}

init();
