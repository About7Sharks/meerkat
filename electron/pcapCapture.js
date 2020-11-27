const fs = require("fs").promises;
// const pcap = require("pcap");
const oui = require("oui");
const neatCsv = require("neat-csv");
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
module.exports = pcapTools;
