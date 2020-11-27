import React from "react";
import Title from "./components/Title";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default function Download() {
  return (
    <div>
      <Title name="Downloads" />

      <div className="downloadPage">
        <p>
          The Git repo is located &nbsp;
          <a
            href="https://github.com/About7Sharks/meerkat"
            rel="noreferrer"
            target="_blank"
          >
            here
          </a>
          &nbsp;if you'd like to compile everything yourself.
        </p>
        <p>
          Mac pre built binaries coming soon, as of now you'll have to compile
          them yourself. Sorry Apple is being slow with a Macbook that was sent
          for repair :(
        </p>
        <div className="linuxDownload">
          <h3>Linux</h3>
          <Button
            onClick={() => {
              window.open(
                "https://github.com/About7Sharks/meerkat/raw/Main/Meerkat-0.1.0.AppImage",
                "Meerkat",
                {
                  target: "noreferrer",
                  width: 100,
                  height: 100,
                }
              );
            }}
          >
            <DownloadOutlined /> Linux AppImage
          </Button>
          <br /> <br />
          <Button
            onClick={() => {
              window.open(
                "https://github.com/About7Sharks/meerkat/raw/Main/meerkat_0.1.0_amd64.deb",
                "Meerkat",
                {
                  target: "noreferrer",
                  width: 100,
                  height: 100,
                }
              );
            }}
          >
            <DownloadOutlined /> Debian
          </Button>
        </div>
        {/* <div className="macDownload">
          <h3>MacOS</h3>
          <Button>
            <DownloadOutlined /> Coming Soon
          </Button>
        </div> */}
      </div>
    </div>
  );
}
