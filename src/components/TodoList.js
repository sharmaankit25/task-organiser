import React, { useEffect } from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { loadTasks } from "../actions/index";
import filterTasks from "../selectors/tasks";

const TodoList = ({ tasks, loadTasks }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (tasks.length <= 0) {
      loadTasks();
    }
  });

  return (
    <div className="section">
      <h3 className="subtitle">Tasks</h3>
      <div className="columns is-multiple">
        <div className="column card">
          <label className="label">Todo</label>
          {filterTasks(tasks, { isCompleted: false }).map(task => (
            <Todo key={task.title} {...task} />
          ))}
        </div>
        <div className="column card">
          <label className="label">Completed</label>
          {filterTasks(tasks, { isCompleted: true }).map(task => (
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
  { loadTasks }
)(TodoList);
