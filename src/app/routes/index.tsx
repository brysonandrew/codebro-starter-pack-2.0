import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import {App} from '..';
import {MainFromStore} from '../main';
import {toPath} from '../../utils/routing';
import {MAIN_PAGES} from '../main/pages/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainFromStore}/>

    {/*pages*/}
    {MAIN_PAGES.map((page, i) =>
      <Route
        key={`page-${i}`}
        path={toPath(page.name)}
        component={MainFromStore}
      />
    )}

  </Route>
);
