import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createGroup, loadGroups, updateGroup ,loadMembers } from "../../actions/index";
import { NavLink as Link } from "react-router-dom";

const Groups = ({ createGroup,updateGroup, groups, members, loadMembers, loadGroups }) => {
  const initGroupState = {
    title: "",
    description: "",
    members:[...members]
  };
  const [group, setGroup] = useState(initGroupState);

  const [groupForm,setGroupForm] = useState({
    type:"create",
    status:false
  })

  useEffect(() => {
    if (!groups.length) {
      loadGroups();
    }
    if (!members.length) {
      loadMembers();
    }
  });

  const addGroup = evt => {
    evt.preventDefault();
    if(groupForm.type === "create"){
      createGroup(group);
    }else{
      console.log("Edit Group")
      updateGroup(group);
    }
    setGroupForm({...groupForm,type:"create",status:false})
    setGroup(initGroupState)
  };

  const editGroup = (group) => {
    setGroup(group);
    setGroupForm({...groupForm,type:"edit",status:true})
  }

  return (
    <section className="section">
    <div className="is-clearfix">
      <div className="is-pulled-right ">
          {groupForm.status === false ? 
          <button className="button is-primary" onClick={e => setGroupForm({...groupForm,type:"create",status:true})}>Create New</button> :
          ""}
      </div>
    </div>
    <br/>
      <div className="columns">
      {(groupForm.status === false) ?
        <div className="column">
          {groups.map(group => (
            <div key={group.slug} className="box has-background-light">
              <Link
                key={group.slug}
                className="button is-info is-outlined"
                to={`groups/${group.slug}`}
              >
                {group.title}
              </Link>
              <div className="is-pulled-right" onClick={e => editGroup(group)}>
                <span className="button icon is-medium has-cursor-pointer">
                  <i className="fas fa-edit"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
        : ""}
        {(groupForm.status === true) ?
          <div className="column">
          <div className="box">
          <div className="is-pulled-right column">
          {groupForm.status === true ? 
          <button onClick={e=>setGroupForm({...groupForm,type:"create",status:false})}>Close</button> :
          ""
        }
      </div>
            <h3 className="subtitle">{groupForm.type.toUpperCase()} GROUP</h3>
            <form onSubmit={addGroup}>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    value={group.title}
                    onChange={e =>
                      setGroup({ ...group, title: e.target.value })
                    }
                    className="input is-info"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    value={group.description}
                    onChange={e =>
                      setGroup({ ...group, description: e.target.value })
                    }
                    className="textarea"
                    placeholder="e.g. Family group (Optional)"
                  />
                </div>
              </div>

              <div className="file">
                <label className="file-label">
                  <input className="file-input" type="file" name="resume" />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span className="file-label">Upload Profile Picture..</span>
                  </span>
                </label>
              </div>

              <div className="field">
                <label className="label">Members</label>
                <div className="control">
                  <div className="select is-multiple ">
                    <select value={group.members} multiple onChange={(e)=>setGroup({ ...group, members:Array.from(e.target.selectedOptions,option => Number(option.value)) })}>
                      {members.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
                        
              <button className="button is-primary">{groupForm.type||"Edit"}</button>
            </form>
          </div>
        </div>
        : ""}
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
  { createGroup, loadGroups, loadMembers,updateGroup }
)(Groups);
