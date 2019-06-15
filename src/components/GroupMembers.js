import React from "react"
import MembersList from "./MembersList"
import groupFilter from "../selectors/groups"
import { connect } from "react-redux";
// import { loadGroups } from "../../actions/index";

const GroupMembers = ({slug,groups,members}) => {
    const group = groupFilter(groups,{slug});
    const group_members = members.filter(member=>group.members.includes(member.id));
    return (
        <div className="section">
        <h3 className="subtitle">Members</h3>
        <MembersList members={group_members}></MembersList>
        </div>
    );
}

const mapStateToProps = ({ groups,members }) => {
    return { groups,members };
};

  
export default connect(mapStateToProps)(GroupMembers);