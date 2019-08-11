import React from "react";
import { connect } from "react-redux";
import { toggleTaskStatus } from "../actions/index";
import TaskCard from "../components/organisms/TaskCard"
import { Draggable } from 'react-beautiful-dnd';

const Todo = ({ id,title,index,isCompleted,toggleTaskStatus,dueDate }) => {
  return (
    <Draggable draggableId={id} index={index}>
    {(provided) => (
      <div className="box has-background-grey-lighter" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <TaskCard title={title} id={id} index={index} dueDate={dueDate} />
      </div>
    )}
    </Draggable>
  );
};

export default connect(
  null,
  { toggleTaskStatus }
)(Todo);
