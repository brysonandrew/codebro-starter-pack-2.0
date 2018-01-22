/** Exporting Containers for Easier Imports */
const appConfig = require('../../config/main.js');

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { MainFromStore } from './main';

const style = require('./style/index.css');

class App extends React.Component<any, any> {
    public render() {
        return (
            <section className={style.AppContainer}>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                {this.props.children}
            </section>
        );
    }
}

export { App };
export { Html } from './html';
export { MainFromStore };
