import React from "react";
import Title from "../components/Title";
export default function About() {
  return (
    <div className="About">
      <Title name="About" />
      <div className="content">
        <p>
          <a href="https://www.nationalgeographic.com/animals/mammals/m/meerkat/">
            Meerkat's
          </a>
          &nbsp; are awesome creatures. They understand the benefit of
          cooperation to protect their communities. We're applying this
          philosophy to the computing community.
        </p>
        <p>
          This is an open-source project meaning you can view the code at our{" "}
          <a href="https://github.com">github repo</a>.
        </p>
        <p>
          If you're a programmer and would like to help contribute submit a pull
          request to start a community discussion on why it should be
          implemented.
        </p>
        <p>
          Not a programmer? Consider donating to our
          <p style={{ fontSize: ".9rem" }}>
            ETH: 0xa485b3e631c02834A73349CFA6c5543bB0796985
          </p>
        </p>
      </div>
    </div>
  );
}
