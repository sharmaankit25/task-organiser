import React, {FC,useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../actions/index";

interface ITask {
  title:string;
  assignee:number[];
  dueDate:string;
  repeat:string;
  isCompleted:boolean;
  groupSlug:any;
}

interface IProps {
  addTask:(task:ITask)=>void;
  groupSlug:string;
  members:any[];
  visibility:boolean;
}

const CreateTodo:FC<IProps> = ({ addTask,groupSlug,members,visibility }) => {
    const now = new Date();
    let dd = String(now.getDate()).padStart(2, '0');
    let mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = now.getFullYear();
    let today = `${yyyy}-${mm}-${dd}`;

  const initialState = {
    title: "",
    assignee: [],
    dueDate: today,
    repeat: "",
    isCompleted: false,
    groupSlug:groupSlug?groupSlug:""
  };
  const [task, setTask] = useState<ITask>(initialState);

  const submitTask = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    addTask(task);
    setTask(initialState);
    visibility = false;
  };
  
  return (
    visibility ?
    <>
      <h2 className="title">Create Todo</h2>
      <form onSubmit={submitTask}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              required
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
              className="input is-info"
              type="text"
              placeholder="Enter Title"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Assignee</label>
          <div className="control">
          <div className="select is-multiple ">
          <select multiple
          value={task.assignee.length > 0 ? task.assignee.toString() : ""} 
          onChange={e => setTask({ ...task, assignee:Array.from(e.target.selectedOptions,option => Number(option.value))}) } className="input is-info select">
          {members.map(member=><option key={member.id} value={member.id}>{member.name}</option>)}
          </select>
          </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Due Date</label>
          <div className="control">
            <input
              value={task.dueDate}
              onChange={e => setTask({ ...task, dueDate: e.target.value })}
              className="input is-info"
              type="date"
              placeholder="Due Date"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Type</label>
          <div className="control">
            <div className="select is-primary">
              <select
                value={task.repeat}
                onChange={e => setTask({ ...task, repeat: e.target.value })}
              >
                <option value="one-time">One Time</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="tri-annual">Tri Annual</option>
                <option value="bi-annual">Bi Annual</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
        </div>

        <button className="button is-primary">Add +</button>
      </form>
    </>
    : <></>
  );
};

export default connect(
  null,
  { addTask }
)(CreateTodo);
