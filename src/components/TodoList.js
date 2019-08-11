import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import filterTasks from "../selectors/tasks";
import filterLabels from "../selectors/labels"
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
import TaskList from "../components/organisms/TaskList"
import { toggleTaskStatus } from "../actions/index";


const TodoList = ({ tasks, groupSlug,labels,toggleTaskStatus }) => {
  const groupLabels = filterLabels(labels,{groupSlug});
  const onDragEnd = result => {
    const {destination,source,draggableId} = result;
    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId){
      return;
    }
    if(destination.droppableId === "Completed" || destination.droppableId==="Backlog"){
      toggleTaskStatus({id:draggableId});
    }
  }
  return (
    <div className="section">
      <div className="box has-background-light scrolling-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns is-mobile">
        <div className="column is-narrow ">
        <TaskList title="Backlog">
        {filterTasks(tasks, { isCompleted: false, groupSlug }).map((task,i) => (
          <Todo index={i} key={task.title} {...task} />
        ))}
        </TaskList>
        </div>
        {groupLabels.map(label=>(
            <div className="column is-narrow" key={label.label}>
            <TaskList title={label.label}>
            Test List
            </TaskList>
            </div>
            )
          )
        }
        <div className="column is-narrow">
          <article className="message is-success card">
          <div className="message-header">
            <label>Completed</label>
            </div>
            <Droppable droppableId="Completed">
            { provided => (
            <div className="message-body" ref={provided.innerRef} {...provided.droppableProps}>
            {filterTasks(tasks, { isCompleted: true, groupSlug }).map((task,i) => (
              <Todo index={i} key={task.title} {...task} />
            ))}
            {provided.placeholder}
            </div>
            )}
            </Droppable>
          </article>
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
  { toggleTaskStatus }
)(TodoList);