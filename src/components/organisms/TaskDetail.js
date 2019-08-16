import React from "react";
import Modal from "../molecules/Modal"
import { connect } from "react-redux";

const TaskDetail = (props) => {
    const {status,title,dueDate,repeat,members,assignee,close} = props;
    const assigniees = members.filter(member=>assignee.includes(member.id) && member.status);
    return (
        <Modal status={status} heading="Task Details" close={close}>
        <label>
            <span className="subtitle">{title}</span>
        </label>
        <div className="is-pulled-right">
            <time className="tag is-warning" dateTime={dueDate}>{dueDate}</time>
        </div>
        <span className="subtitle">{repeat}</span>
        <br/>
        <br/>
        <div className="list is-hoverable">
        {
            assigniees.map((assignee,i)=>(
                <div className="list-item" key={assignee.id}>
                    {assignee.name}
                </div>))
        }
        </div>
        </Modal>
    )
}
const mapStateToProps = ({ groups, members }) => {
    return {
      groups,
      members
    };
  };
export default connect(mapStateToProps)(TaskDetail);