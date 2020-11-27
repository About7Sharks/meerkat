import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
const { Option } = Select;
export default function Capture(props) {
  const [cardInfo, setcardInfo] = useState([]);
  async function startMonitorMode() {
    //grab selected card and sent to backend
    let device = props.selectedCard;
    if (device === "") {
      alert("Select a card first.");
      return;
    } else {
      alert(`Putting ${device} into monitor mode`);
    }
    let res = await window.ipcRenderer.invoke("command", {
      command: "airmon-ng",
      params: ["start", device],
    });
    alert(res); //notify results
    getWifiCard(); // update wifiCards
  }
  //gets wifi devices via iwconfig cmd
  async function getWifiCard() {
    let res = await window.ipcRenderer.invoke("command", {
      command: "iwconfig",
    });
    let devices = [];
    res.split(" ").filter((item) => {
      if (item.includes("wlan")) {
        item = item.slice(item.indexOf("wlan"));
        devices.push(item);
      }
    });
    setcardInfo(devices);
  }

  async function startPcapCapture() {
    let device = props.selectedCard;
    if (device === "") {
      alert("Select a card first.");
      return;
    }

    let timing = parseInt(document.getElementById("duration").value);
    let fileName = document.getElementById("filename").value;
    console.log(fileName, timing);
    let res = await window.ipcRenderer.invoke("command", {
      command: "timeout",
      params: [
        timing,
        "airodump-ng",
        "-w",
        `caps/${fileName}`,
        "--output-format",
        "csv",
        "--band",
        "a",
        device,
      ],
    });
    alert(
      `Starting Capture with ${device} for ${timing} seconds. When complete the file name will be ${fileName}`
    );
    console.log(res);
    alert(res);
  }
  useEffect(() => {
    getWifiCard();
  }, []);
  return (
    <div className="capture">
      <h2>Capture</h2>
      <p>
        Did you know you can set your wireless card into monitor mode to
        passively collect information floating in the air? By doing this you can
        learn a lot about the type of information and device that are near by.
      </p>
      <Form>
        <Form.Item label="Device" rules={[{ required: true }]}>
          <Select
            placeholder="Select a capture device"
            onChange={props.deviceChangeCB}
          >
            {cardInfo.map((card) => {
              return <Option value={card}>{card}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Filename" rules={[{ required: true }]}>
          <Input id="filename" />
        </Form.Item>
        <Form.Item label="Duration" rules={[{ required: true }]}>
          <InputNumber defaultValue={30} id="duration" />
        </Form.Item>

        <div className="centerClass">
          <Button htmlType="button" onClick={startMonitorMode}>
            Put Card into Monitor Mode
          </Button>
          <Button type="primary" onClick={startPcapCapture}>
            {" "}
            capture waves
          </Button>
        </div>
      </Form>
    </div>
  );
}
