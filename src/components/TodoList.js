import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import filterTasks from "../selectors/tasks";

const TodoList = ({ tasks, groupSlug }) => {
  return (
    <div className="section">
      <h3 className="subtitle">Tasks</h3>
      <div className="columns is-multiple">
        <div className="column card">
          <label className="label">Todo</label>
          {filterTasks(tasks, { isCompleted: false, groupSlug }).map(task => (
            <Todo key={task.title} {...task} />
          ))}
        </div>
        <div className="column card">
          <label className="label">Completed</label>
          {filterTasks(tasks, { isCompleted: true, groupSlug }).map(task => (
            <Todo key={task.title} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ tasks }) => {
  return { tasks };
};

export default connect(
  mapStateToProps,
)(TodoList);
