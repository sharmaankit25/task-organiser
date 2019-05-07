import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/index";

const Login = ({ login }) => {
  const authenticate = evt => {
    evt.preventDefault();
    login({ email: "Ankit", password: "asdad" });
  };
  return (
    <div className="section">
      <form onSubmit={authenticate}>
        <div className="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </p>
        </div>
        <div className="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success">Login</button>
          </p>
        </div>
      </form>
    </div>
  );
};
export default connect(
  null,
  { login }
)(Login);
