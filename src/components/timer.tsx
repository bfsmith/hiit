import * as React from 'react';
import { connect } from 'react-redux';

import { CountdownTimer } from '../utils/countdown-timer';

import './timer.scss';

export interface ITimerCountdownProps {
  timeRemaining: number;
};

export interface ITimerCountdownState {
  timeRemaining: number;
  paused: boolean;
}

function mapStateToProps(state: any) {
  return {
  };
}

function mapDispatchToProps(dispatch: any) {
  //   return {
  //     increaseCounter: (): void => dispatch(increment()),
  //     decreaseCounter: (): void  => dispatch(decrement()),
  //   };
}

export class Timer extends React.Component<ITimerCountdownProps, ITimerCountdownState>
  implements React.ComponentLifecycle<ITimerCountdownProps, ITimerCountdownState> {
  static defaultProps: Partial<ITimerCountdownProps> = {
  };
  private timer: CountdownTimer;

  constructor(props: ITimerCountdownProps) {
    super(props);
    this.state = {
      timeRemaining: props.timeRemaining,
      paused: true,
    }
    this.timer = new CountdownTimer({
      timeRemaining: props.timeRemaining,
      tick: this.tick.bind(this),
      tickIntervalMs: 100
    });
  }

  public componentWillMount(): void {
  }

  public componentWillReceiveProps(nextProps: ITimerCountdownProps): void {
    if (this.props !== nextProps) {
      this.timer.pause();
      this.timer = new CountdownTimer({
        timeRemaining: nextProps.timeRemaining,
        tick: this.tick.bind(this),
        tickIntervalMs: 100
      });
      this.updateState({
        timeRemaining: nextProps.timeRemaining,
        paused: true
      });
    }
  }

  public componentWillUnmount(): void {
    this.timer.pause();
  }

  private updateState(update: Partial<ITimerCountdownState>): void {
    const newState = {
      ...this.state,
      ...update
    };
    this.setState(newState);
  }

  private tick(timeRemaining: number): void {
    this.updateState({
      timeRemaining: timeRemaining,
    });
  }

  private startTimer(): void {
    this.timer.start();
    this.updateState({ paused: false });
  }
  private pauseTimer(): void {
    this.timer.pause();
    setImmediate(() => this.updateState({ paused: true }));
  }

  private getFormattedTime(milliseconds: number) {
    let seconds = Math.round(milliseconds / 1000);
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
    const timeRemaining = this.state.timeRemaining;
    const paused = this.state.paused;

    return (
      <div className='timer'>
        <div className="theTime">{this.getFormattedTime(timeRemaining)}</div>
        <button onClick={this.startTimer.bind(this)} disabled={!paused}>Start</button>
        <button onClick={this.pauseTimer.bind(this)} disabled={paused}>Pause</button>
      </div>
    );
  };
}
