import React from "react";
import { connect } from "react-redux";
import { Plugins } from '@capacitor/core';
import filterTasks from "../../selectors/tasks";
import TaskCard from "../organisms/TaskCard";

const Dashboard = ({ tasks }) => {
  const currentDate = new Date().toJSON().slice(0, 10);
  const { Device, Modals } = Plugins;

  const showDeviceInfo = async () =>  {
    let info = await Device.getInfo();
    await Modals.alert({
        title: 'Info',
        message: `UUID: ${info.uuid};
        Model: ${info.model}`
    });
  }
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
          <TaskCard index={i} key={task.id} {...task} />
        ))}
      </div>
      <div className="block">
        <button onClick={showDeviceInfo} className="button is-white">Show Device Info</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ tasks }) => {
  return { tasks };
};

export default connect(mapStateToProps)(Dashboard);
