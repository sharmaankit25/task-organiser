import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import filterTasks from "../selectors/tasks";
import filterLabels from "../selectors/labels"


const TodoList = ({ tasks, groupSlug,labels }) => {
  const groupLabels = filterLabels(labels,{groupSlug});
  return (
    <div className="section">
      <h3 className="subtitle">Tasks</h3>
      <div className="box has-background-light scrolling-wrapper">
      <div className="columns is-mobile">
        <div className="column card">
          <label className="label">Todo</label>
          {filterTasks(tasks, { isCompleted: false, groupSlug }).map(task => (
            <Todo key={task.title} {...task} />
          ))}
        </div>
        {
          groupLabels.map(label=>(
            <div key={label.label} className="column card">
              <label className="label">{label.label}</label>
            </div>
            )
          )
        }
        <div className="column card">
          <label className="label">Completed</label>
          {filterTasks(tasks, { isCompleted: true, groupSlug }).map(task => (
            <Todo key={task.title} {...task} />
          ))}
        </div>
      </div>
      </div>
      </div>
  );
};

const mapStateToProps = ({ tasks,labels }) => {
  return { tasks,labels };
};

export default connect(
  mapStateToProps,
)(TodoList);
