import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateTodos from "../CreateTodo";
import TasksList from "../TodoList";
import { connect } from "react-redux";
import groupFilter from "../../selectors/groups"
import MembersList from "../MembersList"
import AddLabel from "../organisms/AddLabel"
import Message from '../messages/Messages'
import Modal from "../molecules/Modal";

const GroupDetails = ({ match:{params:{slug}},groups,members }) => {
  const [todoFormStatus, setTodoFormStatus] = useState(false);
  const group = groupFilter(groups,{slug});
  const group_members = members.filter(member=>group.members.includes(member.id) && member.status);

  const toggleCreateTaskFrom = evt => {
    evt.preventDefault();
    setTodoFormStatus(!todoFormStatus);
  };

  if(!group){
    return null;
  }

  return (
    <section className="section">
      <h2 className="title">{group.title}</h2>
      <p className="content box">{group.description}</p>
      <nav className="level">
      <div className="level-left">
      <div className="level-item">
        <p className="subtitle is-5">
          <strong></strong>
        </p>
      </div>
      <div className="level-item">
      <AddLabel groupId={group.id}/>
      </div>
      </div>
      <div className="level-right">
        <p className="level-item">
          <Link
            className="button is-info is-outlined"
            to={`/conference/${group.slug}`}
            >
            Start Meeting
          </Link>
        </p>
        <p className="level-item">
        {!todoFormStatus ? <button
          onClick={toggleCreateTaskFrom}
          className="button is-primary"
        >
          Create New Task
        </button> : ""}
        </p>
      </div>
      </nav>

      {todoFormStatus &&
      <Modal status={todoFormStatus} heading="Create Task" close={toggleCreateTaskFrom}>
        <CreateTodos groupSlug={slug} members={group_members} toggleCreateTaskFrom={()=>setTodoFormStatus(false)}/>
      </Modal>
      }
      <TasksList groupSlug={slug} groupId={group.id}/>
      <div className="section">
      <h3 className="subtitle">Members</h3>
        <MembersList members={group_members} />
        <Message groupId={group.id} />
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
  mapStateToProps
)(GroupDetails);

