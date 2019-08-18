import React,{useState} from "react";
import {useSpring, animated} from 'react-spring'
import TaskDetail from "../../components/organisms/TaskDetail"
const TaskCard = (task) => {
    const { title,index,dueDate } = task;
    const animationProps = useSpring({opacity: 1,delay: 140*index-1, from: {opacity: 0}})
    const [modalState,setModalState] = useState(false);
    const openCardDetails = () => {
        setModalState(!modalState)
    }

    let cardColor;
    switch(task.priority){
        case 'medium':
            cardColor = 'has-background-grey-lighter';
            break;
        case 'critical':
            cardColor = 'has-background-danger has-text-white';
            break;
        case 'high':
            cardColor = 'has-background-warning has-text-white';
            break;
        default:
            cardColor = '';
            break;
    }
    
    return (
        <>
    <animated.div className={`box ${cardColor} content`}  onClick={openCardDetails} style={animationProps}>
        <div className="is-pulled-left">
            <span>{title}</span>
        </div>
        <div className="is-pulled-right">
            <time className="tag is-warning" dateTime={dueDate}>
                {dueDate}
            </time>
        </div>
        <div className="is-clearfix"></div>
    </animated.div>
    <div className="is-clearfix"></div>
    {
        modalState? <TaskDetail status={modalState} {...task} close={openCardDetails} />:""
    }
    </>
    )
};

export default TaskCard;