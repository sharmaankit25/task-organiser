import React from "react";

const Members = () => {
    return (
        <section className="section">
            <div className="columns">
                <div className="column">
                    <h1 className="title">Members List</h1>
                </div>
                <div className="column">
                    <h1 className="title">Create Member</h1>
                    <div className="box">
                        <h3 className="subtitle">Create Member</h3>
                        <form>
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input className="input is-info" type="text" placeholder="Enter Title" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="e.g. Family Member (Optional)"></textarea>
                            </div>
                        </div>

                        <div className="file">
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume"/>
                            <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Upload Profile Picture..
                            </span>
                            </span>
                        </label>
                        </div>

                        <div className="field">
                            <label className="label">Type</label>
                            <div className="control">
                            <div className="select is-multiple ">
                            <select multiple>
                                <option value="Argentina">Argentina</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Venezuela">Venezuela</option>
                            </select>
                            </div>
                            </div>
                        </div>

                        <button className="button is-primary">Create</button>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Members;