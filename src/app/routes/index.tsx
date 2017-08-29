import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, HomeFromStore } from 'containers';
import { pageList } from '../../data/content/pages/pages';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeFromStore}/>

    {/*pages*/}
    {pageList.map((page, i) =>
      <Route
        key={`pages-${i}`}
        path={page.path}
        component={HomeFromStore} />)}

  </Route>
);
