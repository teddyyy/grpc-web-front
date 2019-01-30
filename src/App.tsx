import "./App.css";
import * as React from "react";

import { Button, Navbar, NavbarBrand } from 'reactstrap';
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
      <div className="App">
        <header>
          <Navbar color="dark"  class="navbar navbar-default" bg="light" expand="lg">
            <NavbarBrand href="#home" className="App-header-navbrand">Echo App</NavbarBrand>
          </Navbar>
        </header>
        <br /><span className="App-title">文字を返すだけ</span><br />
        <input className="App-input" type="text" value={this.state.inputText} onChange={this.onChange} placeholder="input"/>
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
