import React,{useState,useEffect} from "react"
import {connect} from "react-redux"
import {addTask} from "../actions/index"


const CreateTodo = ({addTask}) =>{
    const state = {title:'',assignee:'',dueDate:'',repeat:'',isCompleted:false}
    const [task,setTask] = useState(state);

    const submitTask = (evt) => {
        evt.preventDefault();
        addTask(task);
        setTask(state);
    }
    return (
    <div className="section">
        <h2 className="title">Create Todo</h2>
        <form onSubmit={submitTask}>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input value={task.title} onChange={(e)=>setTask({...task,title:e.target.value})} 
                        className="input is-info" type="text" placeholder="Enter Title" />
                </div>
            </div>

            <div className="field">
                <label className="label">Assignee</label>
                <div className="control">
                    <input value={task.assignee} onChange={(e)=>setTask({...task,assignee:e.target.value})}
                        className="input is-info" type="text" placeholder="Assignee..." />
                </div>
            </div>

            <div className="field">
                <label className="label">Due Date</label>
                <div className="control">
                    <input value={task.dueDate} onChange={(e)=>setTask({...task,dueDate:e.target.value})}
                        className="input is-info" type="date" placeholder="Due Date" />
                </div>
            </div>

            <div className="field">
                <label className="label">Type</label>
                <div className="control">
                    <div className="select is-primary">
                    <select value={task.repeat} onChange={(e)=>setTask({...task,repeat:e.target.value})}>
                        <option>One Time</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Tri Annual</option>
                        <option>Bi Annual</option>
                        <option>Annual</option>
                    </select>   
                    </div>
                </div>
            </div>

            <button className="button is-primary">Add +</button>
        </form>
    </div>
    )
};

export default connect(null,{addTask})(CreateTodo);