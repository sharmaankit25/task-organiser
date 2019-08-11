import React from "react";
import { connect } from "react-redux";
import filterTasks from "../../selectors/tasks";
import TaskCard from "../organisms/TaskCard";

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
        }).map((task,i) => (
          <div className="box has-background-grey-lighter">
          <TaskCard index={i} key={task.title} {...task} />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tasks }) => {
  return { tasks };
};

export default connect(mapStateToProps)(Dashboard);
