import React,{ useState } from "react";
import { connect } from "react-redux";
import {createLabel} from "../../actions/index"

const AddLabel = ({groupId,createLabel}) => {
    const initialLabelState = {title:"",description:"",wipLimit:0,index:1};
    const [label, setLabel] = useState(initialLabelState);
    const addLabel = evt => {
        evt.preventDefault();
        createLabel(groupId,label)
        setLabel(initialLabelState);
    }
    return (
        <section className="section">
        <div className="field has-addons">
            <div className="control">
                <input value={label.title}  onChange={e => setLabel({...label,title:e.target.value})} className="input" type="text" placeholder="Label Text..." />
            </div>
            <div className="control">
                <input value={label.description}  onChange={e => setLabel({...label,description:e.target.value})} className="input" type="text" placeholder="Label Description..." />
            </div>
            <div className="control">
                <input value={label.wipLimit}  onChange={e => setLabel({...label,wipLimit:e.target.value})} className="input" type="number" placeholder="WIP Limit..." />
            </div>
            <div className="control">
                <button onClick={addLabel} className="button is-info"><i className="fas fa-plus"></i></button>
            </div>
        </div>
        </section>
    )
}


export default connect(null,{createLabel})(AddLabel);