import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addMember, loadMembers } from "../../actions/index";

const Members = ({ addMember, members, loadMembers }) => {
  const [member, setMember] = useState({
    name: ""
  });

  useEffect(() => {
    if (!members.length) {
      loadMembers();
    }
  });

  const handleAddMember = evt => {
    evt.preventDefault();
    addMember(member);
  };

  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <h1 className="title">Members List</h1>
          {members.map(member => (
            <div key={member.name} className="box">
              {member.name}
            </div>
          ))}
        </div>
        <div className="column">
          <h1 className="title">Create Member</h1>
          <div className="box">
            <h3 className="subtitle">Create Member</h3>
            <form onSubmit={handleAddMember}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    value={member.name}
                    onChange={e =>
                      setMember({ ...member, name: e.target.value })
                    }
                    className="input is-info"
                    type="text"
                    placeholder="Enter name or email or phone"
                  />
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

const mapStateToProps = ({ members }) => {
  return {
    members
  };
};

export default connect(
  mapStateToProps,
  { addMember, loadMembers }
)(Members);
