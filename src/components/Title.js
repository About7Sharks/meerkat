import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
export default function Title(props) {
  let history = useHistory();
  return (
    <div className="title">
      <h1>{props.name}</h1>
      <img id="logo" src={logo} alt="logo" />
      <Link onClick={() => history.goBack()} className="customButt" to="/">
        Back
      </Link>
    </div>
  );
}
