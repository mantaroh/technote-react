import React, { Component } from 'react';

import SpearlyContext from './SpearlyContext';

class SpearlyProvider extends Component {
  constructor(props) {
    super(props);

    const {
      client,
      locale,
      renderPromises,
    } = props;

    this.state = {
      client,
      locale,
      renderPromises,
    };
  }

  render() {
    const { children, context } = this.props;

    const Context = context || SpearlyContext;

    console.log(this.state.client, 'No `client` specified on <SpearlyProvider />');

    return (
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    );
  }
}

export default SpearlyProvider;