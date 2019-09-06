import React from "react";
import {Droppable} from 'react-beautiful-dnd';

const TaskList = ({id,title,color,children}) => {  
    return(
        <article className={`message ${color ? color : "is-info"} card`}>
          <div className="message-header">
          <label className="is-pulled-left">{title}</label>
          <div className="is-pulled-right"><i className="fa fa-eye"></i></div>
          </div>
          <Droppable droppableId={id || title}>
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