import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProjectPanel from "./ProjectPanel";
import WorkPanel from "./WorkPanel";
import { getAllProjects } from "../../actions/project";

const Dashboard = ({ getAllProjects, selectedProject }) => {
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="dashboard">
      <ProjectPanel />
      {selectedProject._id ? (
        <WorkPanel />
      ) : (
        <p>Please Select a Project from your Left Panel</p>
      )}
    </div>
  );
};

Dashboard.prototype = {
  getAllProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedProject: state.project.selectedProject
});

export default connect(mapStateToProps, { getAllProjects })(Dashboard);
