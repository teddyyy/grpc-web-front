import "./App.css";
import * as React from "react";

import { Alert, Button, Navbar, NavbarBrand, Input, Table } from 'reactstrap';
import { Env } from './resources/env';
import { GreeterClient } from "./helloworld/HelloworldServiceClientPb";
import { HelloRequest } from "./helloworld/helloworld_pb";

interface HistoryData {
  id: number,
  message: string,
  timestamp: string
}
const hd: HistoryData[] = [{"id": 0, "message": "", "timestamp": ""}]

const initialState = {
  hData: hd,
  hDataLoding: false,
  inputText: "Kubernetes",
  message: "",
  region: ""
};

type State = Readonly<typeof initialState>;

export class App extends React.Component<{}, State> {
  public readonly state: State = initialState;
  public readonly env = new Env();

  public render() {
    return (
      <div className="App">
        <header>
          <Navbar color="dark"  className="navbar navbar-default" bg="light" expand="lg">
            <NavbarBrand href="#home" className="App-header-navbrand">Echo App</NavbarBrand>
          </Navbar>
        </header>
        <br />
        <div className="App-Content">
          <span className="App-title">Hello!</span><br />
          <Input className="App-input" type="text" value={this.state.inputText} onChange={this.onChange} placeholder="input"/>
          <Button onClick={this.onClick} className="btn btn-primary" color="info">Submit</Button>
          <hr />
          { this.state.region && this.state.message && <Alert color="light">From {this.state.region} : {this.state.message}</Alert> }
        </div>
        <div className="App-Table">
        { !this.state.hDataLoding && <p>Service Unavailable</p> }
        { this.state.hDataLoding &&
          <Table bordered size="sm" responsive>
            <tbody>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Timestamp</th>
              </tr>
            </tbody>
            <tbody>
              {this.state.hData.map((data: HistoryData, key: any) => {
                return (
                  <tr key={key}>
                    <td>{data.id}</td>
                    <td>{data.message}</td>
                    <td>{data.timestamp}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        }
        </div>
      </div>
    );
  }

  public componentWillMount = () => {
    const tmp: HistoryData[] = []
    return fetch('http://localhost:8000/history')
        .then((response) => response.json())
        .then((responseJson) =>
            {(responseJson.map((data: HistoryData, k: any) => {
              tmp.push(data)
              this.setState({ hData: tmp })
              this.setState({ hDataLoding: true})
            }))}
        ).catch((e) => {
          console.error(e);
        });
  };

  private onClick = () => {
    const request = new HelloRequest();
    request.setName(this.state.inputText);

    const client = new GreeterClient(this.env.proxyURL, {}, {});
    client.sayHello(request, {}, (err, ret) => {
      if (err || ret === null) {
        throw err;
      }
      this.setState({
        message: ret.getMessage(),
        region: ret.getRegion()
      });
    });

    const tmp: HistoryData[] = []
    fetch('http://localhost:8000/history')
    .then((response) => response.json())
    .then((responseJson) =>
        {(responseJson.map((data: HistoryData, k: any) => {
          tmp.push(data)
          this.setState({ hData: tmp })
          this.setState({ hDataLoding: true})
        }))}
    ).catch((e) => {
      console.error(e);
    });
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };
}

export default App;
