import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Guest extends Component {
    componentDidMount() {
      if (this.props.authenticated) {
        const { history } = this.props;
        history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        const { history } = this.props;
        history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Guest);
}
