import React from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function Tools() {
  let runningElectron = navigator.userAgent.toLowerCase().includes("electron");
  return (
    <div className="tools">
      <Title name="Tools" />
      {runningElectron !== true ? (
        <div style={{ margin: "25px" }}>
          <h2>Tools</h2>
          <p>
            In order to use meerkats tools you need to download it for your
            correct operating system. <strong>Windows not supported</strong>
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="toolPanel">
        <div className="tool">
          <h4>System Info</h4>
          <Button disabled={!runningElectron}>
            <Link to="/SystemInfo">View</Link>&nbsp;
          </Button>
        </div>
        <div className="tool">
          <h4>Network Info</h4>
          <Button disabled={!runningElectron}>
            <Link to="/NetworkInfo">View</Link>&nbsp;
          </Button>
        </div>
      </div>
    </div>
  );
}
