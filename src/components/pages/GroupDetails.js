import React, { useState,useEffect } from "react";
import CreateTodos from "../CreateTodo";
import TasksList from "../TodoList";
import { connect } from "react-redux";
import groupFilter from "../../selectors/groups"
import MembersList from "../MembersList"
import TaskSocket from "../../sockets/TaskSocket";
import {addTaskToReducer} from "../../actions/index"

const GroupDetails = ({ match:{params:{slug}},groups,members,addTaskToReducer }) => {
  const [todoFormStatus, setTodoFormStatus] = useState(false);
  const group = groupFilter(groups,{slug});
  const group_members = members.filter(member=>group.members.includes(member.id) && member.status);
  const toggleCreateTaskFrom = evt => {
    evt.preventDefault();
    setTodoFormStatus(!todoFormStatus);
  };

  useEffect(() => {
    function registerSocket() {
      new TaskSocket().taskCreated(group.id).listen("TaskCreatedEvent", (e) => {
        addTaskToReducer(e.task);
      });
    }
    if(group){
      registerSocket();
    }
  }, [group,addTaskToReducer])

  return (
    <section className="section">
      <h2 className="title">{group ? group.title : ""}</h2>
      <button
        onClick={toggleCreateTaskFrom}
        className={
          todoFormStatus
            ? "is-pulled-right delete is-large"
            : "button is-primary"
        }
      >
        {todoFormStatus ? "Close" : "Create New Task"}
      </button>
      <CreateTodos visibility={todoFormStatus} groupSlug={slug} members={group_members} />
      <TasksList groupSlug={slug} />
      <div className="section">
      <h3 className="subtitle">Members</h3>
        <MembersList members={group_members} />
      </div>
    </section>
  );
};

const mapStateToProps = ({ groups, members }) => {
  return {
    groups,
    members
  };
};

export default connect(
  mapStateToProps,
  {addTaskToReducer}
)(GroupDetails);

