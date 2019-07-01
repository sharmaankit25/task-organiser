import React,{FC} from "react";
import {connect} from "react-redux";
import {logout} from "../actions/index";

interface IProps {
    logout:()=>object;
}

const LogoutBtn:FC<IProps> = ({logout}) => {
    return (
        <button onClick={logout} className="button is-warning">Logout</button>
    );
};

export default connect(null,{logout})(LogoutBtn);