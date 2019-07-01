import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createGroup, loadGroups, loadMembers } from "../../actions/index";
import { NavLink as Link } from "react-router-dom";

const Groups = ({ createGroup, groups, members, loadMembers, loadGroups }) => {
  const [group, setGroup] = useState({
    title: "",
    description: "",
    members:[...members]
  });

  // const []

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
    createGroup(group);
  };

  const editGroup = (group) => {
    setGroup(group);
  }

  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <h1 className="title">Groups List</h1>
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
                <span className="icon is-medium">
                <i className="fa fa-edit"></i>
                </span>
              </div>
            </div>
          ))}
          <button className="button is-primary">Create Group</button>
        </div>
        <div className="column">
          <h1 className="title">Create Group</h1>
          <div className="box">
            <h3 className="subtitle">Create Group</h3>
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
                    <select value={group.members} multiple onChange={(e)=>setGroup({ ...group, members:[parseInt(e.target.value)] })}>
                      {members.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button className="button is-primary">Create</button>
            </form>
          </div>
        </div>
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
  { createGroup, loadGroups, loadMembers }
)(Groups);
