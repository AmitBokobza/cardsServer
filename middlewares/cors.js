const cors = require("cors");

const corsmiddleware = cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  })

  module.exports = corsmiddleware;