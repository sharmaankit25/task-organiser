import React,{useState} from "react"
import {connect} from "react-redux";
import {toggleTaskStatus} from "../actions/index";
const Todo = ({title,isCompleted,toggleTaskStatus,dueDate}) =>{
    const toggleTask = (evt) => {
        toggleTaskStatus({title});
    }

    return (
    <div className="box">
        <label className="checkbox">
            <input type="checkbox" 
                onChange={toggleTask}
                checked={isCompleted}
                /> {" "}
            <span className="subtitle">{title}</span>
        </label>
        <div className="is-pulled-right">
        <time dateTime={dueDate}>{dueDate}</time>
        </div>
    </div>);

}

export default connect(null,{toggleTaskStatus})(Todo);