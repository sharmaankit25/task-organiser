import React, { useState } from "react";
import { connect } from "react-redux";
import { addMember,searchMember } from "../../actions/index";
import MembersList from "../MembersList"

const Members = ({ addMember, members }) => {
  const [member, setMember] = useState({
    name: ""
  });

  const handleAddMember = async evt => {
    evt.preventDefault();
    try{
      const search = await searchMember(member.name);
      if(search.data.data){
        addMember(search.data.data);
      }
    }catch(err){
      console.log(err);
    }
  };

  const handleOnChangeMember = (e) => {
    setMember({ ...member, name: e.target.value });
  }


  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <h1 className="title">Members List</h1>
          <MembersList members={members}/>
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
                      handleOnChangeMember(e)
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

const mapStateToProps = ({ members,groups }) => {
  return {
    members,
    groups
  };
};

export default connect(
  mapStateToProps,
  { addMember }
)(Members);
