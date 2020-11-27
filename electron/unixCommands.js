const { spawn } = require("child_process");
const si = require("systeminformation");
const unix = {
  run: async (cmd, params) => {
    console.log("cmd:", cmd);
    console.log("params:", params);
    return new Promise((resolve, reject) => {
      var command = spawn(cmd, params);
      var result = "";
      command.stdout.on("data", function (data) {
        result += data.toString();
      });
      command.on("close", function (code) {
        resolve(result);
      });
      command.on("error", function (err) {
        reject(err);
      });
    });
  },
  systemInfo: async () => {
    let cat = await si.cpu();
    console.log(cat);
    return cat;
  },
};
module.exports = unix;
