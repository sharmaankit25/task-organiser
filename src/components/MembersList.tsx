import React,{FC} from "react"

type Member = {id:number,name:string,status:boolean};
interface IProps {
    members:any;
}


const MembersList:FC<IProps> = ({members}) => (
        members.map((member:Member) => (
            <div key={member.id} className="box">
                {member.name} {"  "}
                {(member.status || <div className="is-pulled-right"><i className="fas fa-u">Waiting for Approval</i></div> )}
            </div>
        ))
);


export default MembersList;