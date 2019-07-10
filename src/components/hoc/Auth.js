import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Auth extends Component {
    componentDidMount() {
      const { history } = this.props;
      if (!this.props.authenticated) {
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (!nextProps.authenticated) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({auth:{authenticated}}) {
    return { authenticated };
  }

  return connect(mapStateToProps)(Auth);
}