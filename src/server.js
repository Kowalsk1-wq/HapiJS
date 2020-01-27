const Hapi = require("@hapi/hapi");

const server = Hapi.Server({
    port: 5441,
    host: "localhost"
});

module.exports = server;
