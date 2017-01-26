import * as React from 'react';

import { Timer } from '../components/timer';
import { CreateWorkoutComponent } from '../components/workout-create/workout-create';
import { TimerList } from '../components/timer-list';

interface IAppPageProps extends React.Props<any> { };

export default function AppPage(props: IAppPageProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <TimerList />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-xs-12">
              <Timer timeRemaining={5000} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <CreateWorkoutComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
