const black = "\x1b[30m",
red = "\x1b[31m",
green = "\x1b[32m",
yellow = "\x1b[33m",
blue = "\x1b[34m",
purple = "\x1b[35m",
cyan = "\x1b[36m",
white = "\x1b[37m"
orange = "\x1b[38;5;214m"



colorful = (color, string, reset = '\x1b[0m') => color + string + reset;
const client = require("../../../index");

client.once("ready", () => {
  client.user.setActivity("jogar.redefusion.net", {
  })

  console.log(colorful(orange, `[LOGS] ${client.user.tag} Está online!`))

});