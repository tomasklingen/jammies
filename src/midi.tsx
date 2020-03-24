import WebMidi, { Input } from "webmidi";
import React from "react";

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
        <p>Webmidi enabled: {this.state.webMidiEnabled.toString()}</p>
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

interface MidiInputSelectorProps {
  inputChangeHandler: (input: Input) => void;
}

class MidiInputSelector extends React.Component<MidiInputSelectorProps, any> {
  constructor(props: MidiInputSelectorProps) {
    super(props);

    this.state = {
      inputs: WebMidi.inputs,
      selectedInput: WebMidi.inputs?.length ? WebMidi.inputs[0] : undefined
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentDidMount() {
    this.props.inputChangeHandler(this.state.selectedInput);
  }

  inputChangeHandler(e: any) {
    const input = WebMidi.getInputById(e.target.value);

    if (input) {
      this.props.inputChangeHandler(input);
      this.setState({
        selectedInput: input
      });
    }
  }

  render() {
    return this.state.inputs.map((input: Input) => {
      return (
        <div key={input.id}>
          <label>
            <input
              name="inputSelection"
              type="radio"
              checked={this.state.selectedInput === input}
              value={input.id}
              onChange={this.inputChangeHandler}
            ></input>
            {input.name}
          </label>
        </div>
      );
    });
  }
}
