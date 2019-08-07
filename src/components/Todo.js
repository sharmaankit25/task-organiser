import React from "react";
import { connect } from "react-redux";
import { toggleTaskStatus } from "../actions/index";
import {useSpring, animated} from 'react-spring'
import TaskDetail from "../components/organisms/TaskDetail"
const Todo = ({ id,title,index,isCompleted,toggleTaskStatus,dueDate }) => {
  const toggleTask = evt => {
    toggleTaskStatus({ id });
  };
  const animationProps = useSpring({opacity: 1,delay: 250*index, from: {opacity: 0}})
  return (
    <animated.div onClick={e=>console.log("Open Popup")} style={animationProps} className="box has-background-light ">
      <label className="checkbox">
        <input type="checkbox" onChange={toggleTask} checked={isCompleted} />{" "}
        <span className="subtitle">{title}</span>
      </label>
      <div className="is-pulled-right">
        <time className="tag is-warning" dateTime={dueDate}>
          {dueDate}
        </time>
      </div>
    </animated.div>
  );
};

export default connect(
  null,
  { toggleTaskStatus }
)(Todo);
