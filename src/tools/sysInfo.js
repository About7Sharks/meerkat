import React, { useState, useEffect } from "react";
import Title from "../components/Title";

export default function SysInfo() {
  const [SysInfo, setSysInfo] = useState({});
  useEffect(() => {
    window.ipcRenderer.invoke("systemInfo", true).then((res) => {
      console.log(res);
      setSysInfo(res);
    });
  }, []);
  return (
    <div className="sysInfo">
      <Title name="System Info" />
      <div className="content">
        <p>We were able to find the following information on your computer</p>
        <ul>
          {Object.entries(SysInfo).map(([key, value], i) => {
            if (typeof value === "object" || value === "") return "";
            return (
              <li key={key}>
                {key}: {value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
