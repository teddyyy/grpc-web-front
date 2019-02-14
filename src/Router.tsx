import * as React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { App } from './App';
import { History } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <HashRouter>
        <div>            
            <Route exact path="/history" component={ History } />
            <Route exact path="/home" component={ App } />
            <Route exact path="/" component={ App } />
        </div>
        </HashRouter>
    );
}
