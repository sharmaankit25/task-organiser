import React from "react";
import { connect } from "react-redux";
import { toggleTaskStatus } from "../actions/index";
import TaskCard from "../components/organisms/TaskCard"
import { Draggable } from 'react-beautiful-dnd';

const Todo = (task) => {
  const { id,index } = task;
  return (
    <Draggable draggableId={id} index={index}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <TaskCard {...task} />
      </div>
    )}
    </Draggable>
  );
};

export default connect(
  null,
  { toggleTaskStatus }
)(Todo);
