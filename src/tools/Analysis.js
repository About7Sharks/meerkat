import React, { useState, useEffect } from "react";
import { Button, Table, Form, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import oui from "oui";

const { Option } = Select;

export default function Analysis(props) {
  const [recentCaps, setRecentCaps] = useState([]);
  const [stationsTable, setStationsTable] = useState({ data: [], col: [] });
  const [clientsTable, setClientsTable] = useState({ data: [], col: [] });

  const [capFile, setCapFile] = useState({ location: "", name: "" });
  async function getRecentCaps(params) {
    let res = await window.ipcRenderer.invoke("recentPacks");
    setRecentCaps(res);
  }
  async function readPackets() {
    let info = await window.ipcRenderer.invoke("analPack", capFile);
    let stations = info.Devices.filter((device) => {
      return Object.keys(device).length > 7;
    }).map((ting) => {
      return {
        BSSID: ting[0],
        " channel": ting[3],
        " Speed": ting[4],
        " Privacy": ting[5],
        " Cipher": ting[6],
        " Authentication": ting[7],
        " Power": ting[8],
        " # beacons": ting[9],
        " # IV": ting[10],
        " LAN IP": ting[11],
        " ESSID": ting[13],
        " Key": ting[14],
        Vendor: oui(ting[0]),
      };
    });
    let stationCols = Object.values(info.cols[0])
      .map((col) => {
        return {
          title: col,
          dataIndex: col,
          key: col,
        };
      })
      .filter((items, i) => {
        if (i != 1 && i != 2 && i != 12) return items;
      });
    stationCols.push({ title: "Vendor", dataIndex: "Vendor", key: "Vendor" });
    let clients = info.Devices.filter((device) => {
      return Object.keys(device).length <= 7;
    }).map((ting) => {
      return {
        "Station MAC": ting[0],
        " Power": ting[3],
        " # packets": ting[4],
        " BSSID": ting[5],
        " Probed ESSIDs": ting[6],
        Vendor: oui(ting[0]),
      };
    });
    let clientCols = Object.values(info.cols[1])
      .map((col) => {
        return {
          title: col,
          dataIndex: col,
          key: col,
        };
      })
      .filter((items, i) => {
        if (i != 1 && i != 2) return items;
      });
    clientCols.push({ title: "Vendor", dataIndex: "Vendor", key: "Vendor" });

    setStationsTable({
      col: stationCols,
      data: stations,
    });
    setClientsTable({
      col: clientCols,
      data: clients,
    });

    await props.packetAnalysedCB({ clients, stations });
  }
  function handleFileRequest(file) {
    setCapFile({ location: "upload", name: file.file.path });
  }
  useEffect(() => {
    if (capFile.name !== "") {
      readPackets();
    }
  }, [capFile.name]);

  useEffect(() => {
    getRecentCaps();
  }, []);
  return (
    <div className="anal">
      <h2>Analysis</h2>
      <p>
        Load Capture files to view information gathered during package
        collection.
      </p>
      <Form.Item label="Cap File" rules={[{ required: true }]}>
        <Select
          id="selectedCap"
          onChange={(value) => {
            setCapFile({ location: "local", name: value });
          }}
          placeholder="Select a recent capture file"
        >
          {recentCaps.map((cap, i) => {
            return (
              <Option value={cap} key={i}>
                {cap}
              </Option>
            );
          })}
        </Select>
        <Upload customRequest={handleFileRequest}>
          <p>Or Choose From Filesystem</p>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Table columns={stationsTable.col} dataSource={stationsTable.data} />
      <Table columns={clientsTable.col} dataSource={clientsTable.data} />
    </div>
  );
}
