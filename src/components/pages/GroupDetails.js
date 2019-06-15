import React, { useState } from "react";
import CreateTodos from "../CreateTodo";
import TasksList from "../TodoList";
import GroupMembers from "../GroupMembers";

const GroupDetails = ({ match }) => {
  const slug = match.params.slug;
  const [todoFormStatus, setTodoFormStatus] = useState(false);
  const toggleCreateTaskFrom = evt => {
    evt.preventDefault();
    setTodoFormStatus(!todoFormStatus);
  };

  return (
    <section className="section">
      <h2 className="title">Group Name Comes Here</h2>
      <a
        href="#"
        onClick={toggleCreateTaskFrom}
        className={
          todoFormStatus
            ? "is-pulled-right delete is-large"
            : "button is-primary"
        }
      >
        {todoFormStatus ? "Close" : "Create New Task"}
      </a>
      {todoFormStatus ? <CreateTodos groupSlug={slug} /> : ""}
      <TasksList groupSlug={slug} />
      <GroupMembers slug={slug}/>
    </section>
  );
};

export default GroupDetails;
