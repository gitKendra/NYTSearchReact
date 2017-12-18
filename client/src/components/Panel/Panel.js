import React from "react";

const Panel = (props) =>
  <div className="panel panel-info">
    <div className="panel-heading"><h3>{props.header}</h3></div>
    <div className="panel-body">{props.children}</div>
  </div>;

export default Panel;