import React from 'react';

export class ConditionalWrapperComponent extends React.Component<{ condition: boolean, wrapperTrue: any, wrapperFalse: any, children: any }> {
  render() {
    let {condition, wrapperTrue, wrapperFalse, children} = this.props;
    return condition ? wrapperTrue(children) : wrapperFalse(children);
  }
}
