import React from "react";
import { connect } from "react-redux";
import { toggleTaskStatus } from "../actions/index";
const Todo = ({ title, isCompleted, toggleTaskStatus, dueDate }) => {
  const toggleTask = evt => {
    toggleTaskStatus({ title });
  };

  return (
    <div className="box has-background-light ">
      <label className="checkbox">
        <input type="checkbox" onChange={toggleTask} checked={isCompleted} />{" "}
        <span className="subtitle">{title}</span>
      </label>
      <div className="is-pulled-right">
        <time className="tag is-warning" dateTime={dueDate}>
          {dueDate}
        </time>
      </div>
    </div>
  );
};

export default connect(
  null,
  { toggleTaskStatus }
)(Todo);
