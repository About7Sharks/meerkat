const { app, BrowserWindow, ipcMain, Notification } = require("electron");
// var network = require('network');
const path = require("path");
// var pcap = require("pcap");
const fs = require("fs").promises;
const oui = require("oui");
const neatCsv = require("neat-csv");
const { spawn } = require("child_process");
const si = require("systeminformation");
// const unix = require(path.join(__dirname, "./unixCommands"));
// const pcapTools = require(path.join(__dirname, "./pcapCapture"));
let onlineStatusWindow, currentSSID;
console.log(process.env.ELECTRON_ENV);
// (async()=>{
//     currentSSID=await unix.run('iwgetid',["-r"])

// })()
console.log(`file://${path.join(__dirname, "/../build/index.html")}`);
console.log(path.join(__dirname, "../../build/index.html"));

function createWindow() {
  const win = new BrowserWindow({
    // alwaysOnTop: true, //makes window alway on top
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });

  let startURL =
    process.env.ELECTRON_ENV === "development"
      ? "http://localhost:3000"
      : `https://meerkatapp.netlify.app`;
  win.loadURL(startURL);
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  //opens app
  createWindow();
  console.log("Meerkat Started");

  //opens 0x0 browser window for online/offline detection
  //also is used for MINM protection
  // onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false, webPreferences: { nodeIntegration: true } })
  // onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//node function for changes in online/offline status
ipcMain.on("online-status-changed", (event, status) => {
  console.log(status);
  const data = {
    title: "Meerkat detected WIFI Update",
    body: `Current status: ${status}`,
  };
  const notify = new Notification(data);
  notify.on("click", () => {
    console.log("clicked");
  });

  notify.show();
});

//return info about users computer
ipcMain.handle("systemInfo", async (event, ...args) => {
  let dog = await unix.systemInfo();
  console.log(dog);
  return dog;
});

//runs command
ipcMain.handle("command", async (event, ...args) => {
  let cat = await unix.run(
    args[0].command,
    args[0].params ? args[0].params : {}
  );
  console.log(cat);
  return cat;
});

ipcMain.handle("pcapCapture", async (event, args) => {
  let cat = await pcapTools.capture(args);
  console.log(cat);
  return cat;
});

ipcMain.handle("analPack", async (event, args) => {
  console.log(args);
  let cat = await pcapTools.analysis(args);
  return cat;
});
ipcMain.handle("lookupMac", async (event, ...args) => {
  let cat = await pcapTools.lookupMac(JSON.parse(args[0]));
  // console.log(cat);
  return cat;
});
ipcMain.handle("recentPacks", async (event, ...args) => {
  let dog = await fs.readdir(`./caps/`);
  console.log(dog);
  return dog;
});

const pcapTools = {
  // capture: async (params) => {
  //   console.log(params);
  //   pcap_session = pcap.createSession(params.device, { monitor: true });
  //   pcap_session.on("packet", function (raw) {
  //     //console.log(raw);
  //     var packet = pcap.decode.packet(raw);
  //     console.log(packet);
  //   });
  // },
  analysis: async (capFileName) => {
    //read csv cap file and clean up
    let data;
    capFileName.location === "local"
      ? (data = await fs.readFile(`./caps/${capFileName.name}`))
      : (data = await fs.readFile(capFileName.name));
    data = await neatCsv(data);
    let Devices = data.filter((item) => {
      return item[0]?.length == 17;
    });
    let cols = data.filter((item) => {
      if (item[0] !== undefined) {
        return item[0].trim().length !== 17;
      }
    });
    console.log("Devices", Devices);
    console.log("cols", cols);

    return { cols, Devices };
  },
  lookupMac: async (params) => {
    console.log(params);
    return params.map((item) => {
      return oui(item[0]);
    });
  },
};

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
