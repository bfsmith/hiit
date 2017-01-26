import * as React from 'react';
import { connect } from 'react-redux';

import { TimeInput } from '../time-input/time-input';

import './workout-create.scss';

export interface ICreateWorkoutProps {
  defaultState?: ICreateWorkoutState;
};

export interface ICreateWorkoutState {
  name?: string;
  easyPeriod?: number;
  hardPeriod?: number;
  numberOfSets?: number;
  cooldownPeriod?: number;
}


export class CreateWorkoutComponent extends React.Component<ICreateWorkoutProps, ICreateWorkoutState>
  implements React.ComponentLifecycle<ICreateWorkoutProps, ICreateWorkoutState> {
  
  public static defaultProps: ICreateWorkoutProps = {
    defaultState: {
      name: '',
      easyPeriod: 0,
      hardPeriod: 0,
      numberOfSets: 0,
      cooldownPeriod: 0,
    }
  };

  constructor(props: ICreateWorkoutProps) {
    super(props);
    this.state = {
      ...CreateWorkoutComponent.defaultProps,
      ...props.defaultState,
    };
  }

  public componentWillMount(): void {
  }

  public componentWillReceiveProps(nextProps: ICreateWorkoutProps): void {
    if (this.props !== nextProps) {
    }
  }

  public componentWillUnmount(): void {
  }


  private getFormattedTime(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(num: number): string {
    num = Math.floor(num);
    if (num < 0) {
      return '00';
    }
    if (num < 10) {
      return `0${num}`;
    }
    return String(num);
  }

  render() {
    return (
      <div className='workout-create'>
        <div className="row">
          <div className="col-xs-12">Easy</div>
        </div>
        <TimeInput className="easy" seconds={this.state.easyPeriod} />
        <div className="row">
          <div className="col-xs-12">Hard</div>
        </div>
        <TimeInput className="hard" seconds={this.state.hardPeriod} />
        <div className="row">
          <div className="col-xs-12">Cooldown</div>
        </div>
        <TimeInput className="cooldown" seconds={this.state.cooldownPeriod} />
      </div>
    );
  };
}
