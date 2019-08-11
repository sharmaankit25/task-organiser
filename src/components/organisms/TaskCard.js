import React,{useState} from "react";
import {useSpring, animated} from 'react-spring'
import TaskDetail from "../../components/organisms/TaskDetail"
const TaskCard = ({ id,title,index,dueDate }) => {
    const animationProps = useSpring({opacity: 1,delay: 150*index, from: {opacity: 0}})
    const [modalState,setModalState] = useState(false);
    const openCardDetails = () => {
        console.log("Open Popup",id)
        setModalState(!modalState)
    }
    
    return (
    <animated.div onClick={openCardDetails} style={animationProps}>
        <label className="checkbox">
        <span className="subtitle">{title}</span>
        </label>
        <div className="is-pulled-right">
        <time className="tag is-warning" dateTime={dueDate}>
            {dueDate}
        </time>
        </div>
        {
            modalState? <TaskDetail status={modalState} title={title}/>:""
        }
    </animated.div>
    )
};

export default TaskCard;