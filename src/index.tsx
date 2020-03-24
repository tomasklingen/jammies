import React from "react";
import ReactDOM from "react-dom";
import MidiComponent from "./midi";

import "./index.css";

class Jammies extends React.Component {
  render() {
    return (
      <div className="jammies">
        <MidiComponent></MidiComponent>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Jammies />, document.getElementById("root"));
