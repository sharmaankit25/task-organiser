import React, { Component } from "react";

class Modal extends Component {
  state = {
    status: this.props.status ? this.props.status : false
  };

  open = e => {
    e.preventDefault();
    this.setState({ status: true });
  };

  componentWillReceiveProps(prop) {
    this.setState({ status: prop.status });
  }

  render() {
    if(!this.state.status){
      return null
    }
    return (
      <div className="modal is-active">
        <div className="modal-background" />>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.heading || "Details"}</p>
            <button
              onClick={this.props.close}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">{this.props.children}</section>
          <footer className="modal-card-foot">
            {/** <button onClick={this.close} className="button">
              Close
            </button>*/}
          </footer>
        </div>
      </div>
    );
  }
}

export default Modal;