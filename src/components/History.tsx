import * as React from 'react';
import { Navbar, NavbarBrand, NavLink, Table } from 'reactstrap';

interface HistoryData {
    id: string,
    message: string,
    timestamp: string
}

const hd: HistoryData[] = [{"id": "", "message": "", "timestamp": ""}]
const initialState = { hData : hd };
type State = Readonly<typeof initialState>;

export class History extends React.Component<{}, State> {
    public state: State = initialState;

    public render() {
        return (
            <div className="History">
                <header>
                    <Navbar color="dark"  className="navbar navbar-default" bg="light" expand="lg">
                        <NavbarBrand href="#home" className="App-header-navbrand">Echo App</NavbarBrand>
                        <NavLink href="#history" className="App-header-navbrand">History</NavLink>
                    </Navbar>
                </header>
                <Table>
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
                    }))}
            );
    };

}
