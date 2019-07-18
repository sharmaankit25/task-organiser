import React,{FC} from "react"

type Member = {id:number,name:string,status:boolean};
interface IProps {
    members:any;
}


const MembersList:FC<IProps> = ({members}) => 
     (
        members.map((member:Member) => (
            <div key={member.id} className="box">
                {member.name} {"  "}
                {(member.status ? <i className="fas fa-check"></i> : '' )}
            </div>
        ))
    );


export default MembersList;