import React,{useState} from "react";
import { connect } from "react-redux";
import { login } from "../../actions/index";

const Login = ({ login,error,history,authenticated }) => {
  const [credentials,setCredentials] = useState({
    email:"",
    password:""
  });

  const redirect = () => {
    if(authenticated){
      history.push('/');
    }
  }

  const authenticate = evt => {
    evt.preventDefault();
    login(credentials);
    redirect();
  };

  return (
    <div className="section">
      <form onSubmit={authenticate}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Email"
              value={credentials.email}
              onChange={e=>setCredentials({...credentials,email:e.target.value})}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" 
              value={credentials.password}
              onChange={e=>setCredentials({...credentials,password:e.target.value})}
              />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="help is-danger">{error || ""}</p>
          <p className="control">
            <button className="button is-success">Login</button>
          </p>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({auth:{error,authenticated}}) => {
  return {
    error,
    authenticated
  }
}

export default connect(
  mapStateToProps,
  { login }
)(Login);
