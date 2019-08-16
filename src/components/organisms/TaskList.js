import React from "react";
import {Droppable} from 'react-beautiful-dnd';

const TaskList = ({title,color,children}) => {
    return(
        <article className={`message ${color ? color : "is-info"} card`}>
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