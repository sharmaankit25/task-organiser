import React,{useEffect} from "react";
import TodoList from "../TodoList";
import {connect} from "react-redux";
import {filterTasks} from "../../actions/index";
import Todo from "../Todo"

const Dashboard = ({tasks}) => {
    return (
        <div className="section">
        <h1 className="title">Dashboard</h1>
        
        <hr/>
        
        <div className="box">
        <h1 className="subtitle">Dues Todays</h1>
        {
            tasks
            .filter(task=>{
                return task.dueDate==new Date().toJSON().slice(0,10) && task.isCompleted == false
            })
            .map(task=><Todo key={task.title} {...task} />)
        }
        </div>
        </div>
    );
}

const mapStateToProps = ({tasks}) =>{
    return {tasks};
}

export default connect(mapStateToProps)(Dashboard);