import React from "react";
import {connect} from "react-redux";
import {logout} from "../actions/index";

const LogoutBtn = ({logout}) => {
    return (
        <button onClick={logout} className="button is-warning">Logout</button>
    );
};

export default connect(null,{logout})(LogoutBtn);