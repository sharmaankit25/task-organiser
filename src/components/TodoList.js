import React,{useState,useEffect} from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import filterTasks from "../selectors/tasks";
import filterLabels from "../selectors/labels"
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from "../components/organisms/TaskList"
import { updateTask,loadLabels } from "../actions/index";


const TodoList = ({ tasks,groupSlug,groupId,labels,updateTask,loadLabels }) => {
  const [tasksData,setTasksData] = useState(tasks);
  useEffect(() => {
    async function fetchData() {
      if(groupId){        
        loadLabels(groupId);
      }
      await setTasksData(tasks);
    }
    fetchData();
    return () => {
      
    };
  }, [tasks,groupId,loadLabels])

  const onDragEnd = result => {
    const {destination,source,draggableId} = result;
    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId){
      return;
    }

    if(destination.droppableId === "Completed"){
      updateTask(draggableId,{isCompleted:true,label_id:0});
    }else if(destination.droppableId==="Backlog"){
      updateTask(draggableId,{isCompleted:false,label_id:0});
    }else{
      updateTask(draggableId,{isCompleted:false,label_id:destination.droppableId});
    }
  }


  const searchCards = evt =>{
    const newTasks = tasks.filter((task)=>( task.title.includes(evt.target.value)));
    setTasksData(newTasks);
  }

  if(!tasksData){
    return (<h4>Loading ....</h4>);
  }

  return (
    <div className="section">
      <div className="field has-addons">
          <p className="control">
            <input className="input" type="text" placeholder="Search cards" onInput={searchCards} />
          </p>
        </div>
      <div className="box has-background-light scrolling-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns is-mobile">
        <div className="column is-narrow ">
          <TaskList title="Backlog" color="is-default">
          {
            filterTasks(tasksData, { isCompleted: false, groupSlug,label_id:0 }).map((task,i) => (
              <Todo index={i} key={task.id} {...task} />
            ))
          }
          </TaskList>
        </div>
        {
          groupId && filterLabels(labels,{groupId}).length > 0 && filterLabels(labels,{groupId}).map(label=>(
            <div className="column is-narrow" key={label.title}>
            <TaskList {...label} color="is-info">
            {filterTasks(tasksData, { isCompleted: false, groupSlug,label_id:label.id }).map((task,i) => (
              <Todo index={i} key={task.id} {...task} />
            ))}
            </TaskList>
            </div>
            )
          )
        }
        <div className="column is-narrow">
          <TaskList title="Completed" color="is-success">
            {filterTasks(tasksData, { isCompleted: true, groupSlug,label_id:0 }).map((task,i) => (
              <Todo index={i} key={task.id} {...task} />
            ))}
          </TaskList>
        </div>
      </div>
      </DragDropContext>
      </div>
      </div>
  );
};

const mapStateToProps = ({ tasks,labels }) => {
  return { tasks,labels };
};

export default connect(
  mapStateToProps,
  { updateTask,loadLabels }
)(TodoList);