import * as React from 'react';

import { Timer } from '../components/timer';
import { TimerList } from '../components/timer-list';

interface IAppPageProps extends React.Props<any> { };

export default function AppPage(props: IAppPageProps) {
  return (
    <div className="row">
      <div className="col-md-3">
        <TimerList />
      </div>
      <div className="col-md-9">
        <div><Timer timeRemaining={5000} /></div>
      </div>
    </div>
  );
}
