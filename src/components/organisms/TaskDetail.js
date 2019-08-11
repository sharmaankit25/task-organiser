import React,{ useState } from "react";
import Modal from "../molecules/Modal"

const TaskDetail = ({status,title}) => {
    
    return (<Modal status={status}><h1>{title}</h1></Modal>)
}

export default TaskDetail;