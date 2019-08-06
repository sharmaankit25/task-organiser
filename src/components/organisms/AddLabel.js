import React,{ useState } from "react";
import { connect } from "react-redux";
import {createLabel} from "../../actions/index"

const AddLabel = ({groupSlug,createLabel}) => {
    const [label, setLabel] = useState("");
    const addLabel = evt => {
        evt.preventDefault();
        createLabel({groupSlug,label})
        setLabel("");
    }
    return (
        <section className="section">
        <div className="field has-addons">
            <div className="control">
                <input value={label}  onChange={e => setLabel(e.target.value)} className="input" type="text" placeholder="Label Text..." />
            </div>
            <div className="control">
                <button onClick={addLabel} className="button is-info"><i className="fas fa-plus"></i></button>
            </div>
        </div>
        </section>
    )
}


export default connect(null,{createLabel})(AddLabel);