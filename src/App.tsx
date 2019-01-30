import "./App.css";
import * as React from "react";

import { Button } from 'reactstrap';
import { Env } from './resources/env';
import { GreeterClient } from "./helloworld/HelloworldServiceClientPb";
import { HelloRequest } from "./helloworld/helloworld_pb";

const initialState = {
  inputText: "Kubernetes",
  message: ""
};
type State = Readonly<typeof initialState>;

class App extends React.Component<{}, State> {
  public readonly state: State = initialState;
  public readonly env = new Env();

  public render() {
    return (
      <div className="App" key="one">
        <p>入力した文字をエコーするだけのアプリ</p>
        <input type="text" value={this.state.inputText} onChange={this.onChange} placeholder="Enter"/>
        <Button onClick={this.onClick} class="btn btn-primary" color="info">Submit</Button>
        <p>{this.state.message}</p>
      </div>
    );
  }

  private onClick = () => {
    const request = new HelloRequest();
    request.setName(this.state.inputText);

    const client = new GreeterClient(this.env.proxyURL, {}, {});
    client.sayHello(request, {}, (err, ret) => {
      if (err || ret === null) {
        throw err;
      }
      this.setState({ message: ret.getMessage() });
    });
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };
}

export default App;
