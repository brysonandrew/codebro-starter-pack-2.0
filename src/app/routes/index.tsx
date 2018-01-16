import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import {App} from '..';
import {MainFromStore} from '../main';
import {pages} from '../main/pages';
import {toPath} from '../../utils/routing';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainFromStore}/>

    {/*pages*/}
    {pages.map((page, i) =>
      <Route
        key={`page-${i}`}
        path={toPath(page)}
        component={MainFromStore}
      />
    )}

  </Route>
);
