import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { pageList } from '../../data/content/pages/pages';
import {App} from '../index';
import {MainFromStore} from '../main';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainFromStore}/>

    {/*pages*/}
    {pageList.map((page, i) =>
      <Route
        key={`pages-${i}`}
        path={page.path}
        component={MainFromStore} />)}

  </Route>
);
