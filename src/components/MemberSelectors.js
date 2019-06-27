import React from "react"

const MemberSelector = ({members}) => {
    return (
        members.map(member => (
            <div key={member.name} className="box">
              {member.name}
            </div>
        ))
    );
}

export default MemberSelector;