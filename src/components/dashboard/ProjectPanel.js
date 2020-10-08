import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNewProject, selectProject } from "../../actions/project";

const ProjectPanel = ({
  createNewProject,
  selectProject,
  projects,
  selectedProject
}) => {
  const [projectName, setProjectName] = useState("");

  const onClick = val => {
    selectProject(val);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setProjectName("");
    createNewProject(projectName);
  };

  return (
    <div className="project container">
      {projects.length ? (
        <div>
          <h2>Your Projects</h2>
          {projects.map(e => {
            return (
              <div
                key={e._id}
                onClick={() => onClick(e)}
                className={
                  e._id === selectedProject._id
                    ? "project-selected"
                    : "project-ele"
                }
              >
                <div>{e.projectName}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>you dont have any project</div>
      )}
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <p className="text-dark">Create New Project</p>
          <input
            type="text"
            placeholder="Create New Project"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
};

ProjectPanel.prototype = {
  createNewProject: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  projects: PropTypes.array
};

const mapStateToProps = state => ({
  projects: state.project.projects,
  selectedProject: state.project.selectedProject
});

export default connect(mapStateToProps, { createNewProject, selectProject })(
  ProjectPanel
);
