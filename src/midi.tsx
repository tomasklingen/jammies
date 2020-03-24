import React from "react";
import WebMidi, { Input } from "webmidi";

interface MidiInputSelectorProps {
  inputChangeHandler: (input: Input) => void;
}

interface MidiInputSelectorState {
  inputs: Input[];
  selectedInput?: Input;
}

export class MidiInputSelector extends React.Component<
  MidiInputSelectorProps,
  MidiInputSelectorState
> {
  constructor(props: MidiInputSelectorProps) {
    super(props);

    this.state = {
      inputs: WebMidi.inputs,
      selectedInput: WebMidi.inputs?.length ? WebMidi.inputs[0] : undefined
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    if (this.state.selectedInput) {
      props.inputChangeHandler(this.state.selectedInput);
    }
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
