import * as React from 'react';
import { connect } from 'react-redux';

import { InputNumber } from '../input-number/input-number';

import './time-input.scss';

export interface ITimeInputProps {
  seconds: number;
  className?: string;
};

export interface ITimeInputState {
  seconds: number;
}


export class TimeInput extends React.Component<ITimeInputProps, ITimeInputState> {

  public static defaultProps: ITimeInputProps = {
    seconds: 0,
    className: '',
  };

  constructor(props: ITimeInputProps) {
    super(props);
    this.state = {
      seconds: props.seconds || 0
    };
  }

  private secondsChanged(value: number): void {
    const minutes = this.getMinutes(this.state.seconds);
    const newSeconds = minutes * 60 + value;
    this.setState({ seconds: newSeconds });
  }

  private addSecond(delta: number): void {
    this.setState({ seconds: this.state.seconds + delta });
  }

  private addMinute(): void {
    this.setState({ seconds: this.state.seconds + 60 });
  }
  private subtractMinute(): void {
    this.setState({ seconds: this.state.seconds - 60 });
  }

  private minutesChanged(value: number): void {
    const seconds = this.getSeconds(this.state.seconds);
    const newSeconds = value * 60 + seconds;
    this.setState({ seconds: newSeconds });
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

  private getSeconds(seconds: number): number {
    return this.state.seconds % 60;
  }
  private getMinutes(seconds: number): number {
    return Math.floor(this.state.seconds / 60);
  }

  render() {
    const seconds = this.getSeconds(this.state.seconds);
    const minutes = this.getMinutes(this.state.seconds);
    const secondsChanged = this.secondsChanged.bind(this);
    const minutesChanged = this.minutesChanged.bind(this);

    const addSecond = this.addSecond.bind(this);
    const addMinute = this.addMinute.bind(this);

    return (
      <div className='time-input row'>
        <div className="minutes col-xs-6 col-md-4">
          <InputNumber className={this.props.className} max={59} min={0} num={minutes} onChange={minutesChanged} /> <span className="unit">M</span>
        </div>
        <div className="seconds col-xs-6 col-xs-4">
          <InputNumber className={this.props.className} max={59} min={0} num={seconds} onChange={secondsChanged} /> <span className="unit">S</span>
        </div>
      </div>
    );
  };
}
