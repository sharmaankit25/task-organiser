import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { addMember,searchMember,loadInvitations,acceptInvite,rejectInvite } from "../../actions/index";
import MembersList from "../MembersList"
import { throws } from "assert";

const Members = ({ addMember, members }) => {

  useEffect(() => {
    async function fetchData() {
      const invitations = await loadInvitations()
      setInvitations(invitations.data.data);
    }
    fetchData();
  }, [])

  const [invitations,setInvitations] = useState([])
  const [error,setError] = useState("");

  const [member, setMember] = useState({
    name: ""
  });

  const handleAddMember = async evt => {
    evt.preventDefault();
    
    try{
      const {data} = await searchMember(member.name);
      if(data.id){
        addMember(data);
      }else{
        throws("Not Found")
      }
    }catch(err){
      setError("No user found with this email");
    }
  };

  const handleOnChangeMember = (e) => {
    setMember({ ...member, name: e.target.value });
  }

  const acceptInvitation = async (id) =>{
    await acceptInvite(id);
    const invitations = await loadInvitations()
    setInvitations(invitations.data.data);
  }

  const rejectInvitation = async (id) =>{
    await rejectInvite(id)
    const invitations = await loadInvitations()
    setInvitations(invitations.data.data)
  }

  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <h1 className="title">Members List</h1>
          <MembersList members={members}/>
          {(invitations.length) ? <h1 className="title">Requests/Invitations</h1>: ""}
          {
            invitations.map(member => (
            <div key={member.id} className="box">
            {member.name} {"  "}
            {member.status ? 
            <i className="fas fa-check"></i> :
            <div className="is-pulled-right">
            <button onClick={e=>acceptInvitation(member.id)} className="button is-default">Accept</button>
            <button onClick={e=>rejectInvitation(member.id)} className="button is-default">Reject</button>
            </div>
            }
            </div>
          ))
        }
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
                {error}
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
