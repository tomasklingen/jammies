import WebMidi, { Input } from "webmidi";
import React from "react";
import { MidiInputSelector } from "./midi";

interface MidiCompState {
  webMidiEnabled: boolean;
  error: any;
  selectedInput?: Input;
}

export default class MidiComp extends React.Component<{}, MidiCompState> {
  constructor(props: any) {
    super(props);
    this.state = {
      webMidiEnabled: false,
      error: undefined
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentDidMount() {
    WebMidi.enable(err => {
      this.setState({
        webMidiEnabled: !err,
        error: err ? err.message : null
      });
    });
  }

  componentWillUnmount() {
    WebMidi.disable();
  }

  inputChangeHandler(input: Input) {
    if (!input) {
      return;
    }

    this.setState({
      selectedInput: input
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.error}</p>
        <p>Webmidi enabled: {this.state.webMidiEnabled ? "✅" : "❌"}</p>
        <p>
          Selected input: {this.state.selectedInput?.name} -{" "}
          {this.state.selectedInput?.id}
        </p>
        {this.state.webMidiEnabled && (
          <MidiInputSelector
            inputChangeHandler={this.inputChangeHandler}
          ></MidiInputSelector>
        )}
      </div>
    );
  }
}
