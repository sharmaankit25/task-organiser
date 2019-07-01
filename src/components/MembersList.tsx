import React,{FC} from "react"

type Member = {name:string};
interface IProps {
    members:any;
}


const MembersList:FC<IProps> = ({members}) => {
    return (
        members.map((member:Member) => (
            <div key={member.name} className="box">
              {member.name}
            </div>
        ))
    );
}

export default MembersList;