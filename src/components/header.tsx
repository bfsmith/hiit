import * as React from 'react';
import {
  Router,
  Route,
  IndexLink,
  IndexRoute,
  hashHistory,
  browserHistory
} from 'react-router';

import './header.scss';

export class Header extends React.Component<{}, {}> {
  render() {
    return <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          The Header
        </div>
      </div>
    </nav>;
  }
}
