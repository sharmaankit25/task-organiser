import React,{FC} from "react"

type Member = {id:number,name:string};
interface IProps {
    members:any;
}


const MembersList:FC<IProps> = ({members}) => 
     (
        members.map((member:Member) => (
            <div key={member.id} className="box">
              {member.name}
            </div>
        ))
    );


export default MembersList;