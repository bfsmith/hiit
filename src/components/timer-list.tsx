import * as React from 'react';
import { connect } from 'react-redux';

export interface ITimerListProps {
};

export interface ITimerListState {

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

class TimerListComponent extends React.Component<ITimerListProps, ITimerListState> {
  render() {
    return (
      <p>Some List</p>
    );
  };
}

export const TimerList = connect(mapStateToProps)(TimerListComponent);
