import * as React from 'react';
import { connect } from 'react-redux';

import './input-number.scss';

export interface IInputNumberProps {
  num: number;
  className?: string;
  min?: number;
  max?: number;
  onChange: (num: number) => void;
};

export interface IInputNumberState {
  num: number;
}

export class InputNumber extends React.Component<IInputNumberProps, IInputNumberState>
  implements React.ComponentLifecycle<IInputNumberProps, IInputNumberState> {

  public static defaultProps: IInputNumberProps = {
    num: 0,
    onChange: () => ({}),
  };

  constructor(props: IInputNumberProps) {
    super(props);
    this.state = {
      num: props.num || 0
    };
  }

  public componentWillReceiveProps(nextProps: IInputNumberProps): void {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.setState({ num: nextProps.num || 0 });
    }
  }


  private inc(): void {
    this.changeValue(this.state.num + 1);
  }
  private dec(): void {
    this.changeValue(this.state.num - 1);
  }

  private numChanged(event: any): void {
    this.changeValue(event.target.value);
  }

  private changeValue(value: number): void {
    if (this.props.max != undefined) {
      value = Math.min(this.props.max, value);
    }
    if (this.props.min != undefined) {
      value = Math.max(this.props.min, value);
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({ num: value });
  }

  render() {
    const numChanged = this.numChanged.bind(this);
    const inc = this.inc.bind(this);
    const dec = this.dec.bind(this);

    return (
      <span className={'input-number ' + (this.props.className || '')}>
        <span className="glyphicon glyphicon-minus" onClick={dec}></span>
        <input type="tel" max={59} min={0} onChange={numChanged} value={this.state.num} placeholder=" " />
        <span className="glyphicon glyphicon-plus" onClick={inc}></span>
      </span>
    );
  };
}
