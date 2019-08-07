import React, { Component } from "react";

class Modal extends Component {
  state = {
    status: this.props.status ? this.props.status : false
  };

  close = e => {
    e.preventDefault();
    console.log("close Pop")
    this.setState({ status: false });
  };

  componentWillReceiveProps(prop) {
    this.setState({ status: prop.status });
  }

  render() {
    return (
      <div className={`modal ${this.state.status ? "is-active" : ""}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Details</p>
            <button
              onClick={this.close}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">{this.props.children}</section>
          <footer className="modal-card-foot">
            <button onClick={this.close} className="button">
              Close
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Modal;