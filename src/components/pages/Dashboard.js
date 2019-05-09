import React from "react";
import { connect } from "react-redux";
import filterTasks from "../../selectors/tasks";
import Todo from "../Todo";

const Dashboard = ({ tasks }) => {
  const currentDate = new Date().toJSON().slice(0, 10);
  return (
    <div className="section">
      <h1 className="title">Dashboard</h1>

      <hr />

      <div className="box">
        <h1 className="subtitle">Dues Todays</h1>
        {filterTasks(tasks, {
          isCompleted: false,
          dueDate: currentDate
        }).map(task => (
          <Todo key={task.title} {...task} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tasks }) => {
  return { tasks };
};

export default connect(mapStateToProps)(Dashboard);
