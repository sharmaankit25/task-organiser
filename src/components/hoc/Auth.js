import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Auth extends Component {
    componentDidMount() {
      const { history } = this.props;
      if(!localStorage.token){
        if (!this.props.authenticated) {
          history.push('/login');
        }
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if(!localStorage.token){
        if (!nextProps.authenticated) {
          history.push('/login');
        }
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