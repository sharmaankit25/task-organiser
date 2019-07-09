import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Guest extends Component {
    componentDidMount() {
      const { history } = this.props;
      if (this.props.authenticated) {
        history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (nextProps.authenticated) {
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