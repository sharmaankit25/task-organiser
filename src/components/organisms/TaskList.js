import React from "react";
import {Droppable} from 'react-beautiful-dnd';

const TaskList = ({title,children}) => {
    return(
        <article className="message is-primary card">
          <div className="message-header">
            <label>{title}</label>
          </div>
          <Droppable droppableId={title}>
            {provided => (
            <div className="message-body" ref={provided.innerRef} {...provided.droppableProps} >          
            {children}
            {provided.placeholder}
            </div>
            )}
          </Droppable>
        </article>
    )
}

export default TaskList;