import React,{useState} from "react";
import {useSpring, animated} from 'react-spring'
import TaskDetail from "../../components/organisms/TaskDetail"
const TaskCard = (task) => {
    const { title,index,dueDate } = task;
    const animationProps = useSpring({opacity: 1,delay: 140*index-1, from: {opacity: 0}})
    const [modalState,setModalState] = useState(false);
    const openCardDetails = () => {
        console.log("Stae");
        setModalState(!modalState)
    }

    return (
        <>
    <animated.div className="box has-background-grey-lighter"  onClick={openCardDetails} style={animationProps}>
        <label>
            <span className="subtitle">{title}</span>
        </label>
        <div className="is-pulled-right">
        <time className="tag is-warning" dateTime={dueDate}>
            {dueDate}
        </time>
        </div>
    </animated.div>
    <div className="is-clearfix"></div>
    {
        modalState? <TaskDetail status={modalState} {...task} close={openCardDetails} />:""
    }
    </>
    )
};

export default TaskCard;