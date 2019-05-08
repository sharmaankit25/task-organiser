import React,{useEffect} from "react"
import Todo from "./Todo"
import {connect} from "react-redux"
import {loadTasks} from "../actions/index"

const TodoList = ({tasks,loadTasks}) =>{
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if(tasks.length <= 0){
            loadTasks();
        }
    });

    return (
        <div className="section">
            <h3 className="subtitle">Tasks</h3>
            <div className="columns is-multiple">
                <div className="column box">
                    <label className="label">Todo</label>
                    {   
                        tasks
                        .filter(task=>task.isCompleted === false)
                        .map(task=><Todo key={task.title} {...task} />)
                    }
                </div>
                <div className="column box">
                    <label className="label">Completed</label>
                    {   
                        tasks
                        .filter(task=>task.isCompleted === true)
                        .map(task=><Todo key={task.title} {...task} />)
                    }
                </div>
            </div>
            
        </div>
    );
};

const mapStateToProps = ({tasks})=>{
    return {tasks}
}

export default connect(mapStateToProps,{loadTasks})(TodoList);