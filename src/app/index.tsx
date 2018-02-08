/** Exporting Containers for Easier Imports */
const appConfig = require('../../config/main.js');

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { MainFromStore } from './main';

require('./style/index.css');

class App extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                {this.props.children}
            </div>
        );
    }
}

export { App };
export { Html } from './html';
export { MainFromStore };
