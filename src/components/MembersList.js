import React from "react"

const MembersList = ({members}) => {
    return (
        members.map(member => (
            <div key={member.name} className="box">
              {member.name}
            </div>
        ))
    );
}

export default MembersList;