import React,{useState} from "react";
import {useSpring, animated} from 'react-spring'
import TaskDetail from "../../components/organisms/TaskDetail"
const TaskCard = (task) => {
    const { title,dueDate,priority,id } = task;
    const animationProps = useSpring({opacity: 1,delay: 200, from: {opacity: 0}})
    const [modalState,setModalState] = useState(false);
    const openCardDetails = () => {
        setModalState(!modalState)
    }

    let cardColor;
    
    switch(priority){
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
            cardColor = 'has-background-grey-lighter';
            break;
    }
    
    if(!task){
        return (<h4>Loading ...</h4>)
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