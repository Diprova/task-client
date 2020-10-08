import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createNewTask } from "../../actions/task";

const TaskForm = ({ selectedProject, setTaskCreate, createNewTask }) => {
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Create New Task Form Submit
  const onSubmit = async e => {
    let projectId = selectedProject._id;
    e.preventDefault();
    createNewTask({ taskName, projectId, startTime, endTime });
    setTaskName("");
    setTaskCreate(false);
  };

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          value={taskName}
          className="work-input"
          placeholder="Project Name"
          onChange={e => setTaskName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="">Start Time </label>
        <DatePicker
          selected={startTime}
          onChange={date => setStartTime(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

      <div className="form-group">
        <label className="">End Time </label>
        <DatePicker
          selected={endTime}
          onChange={date => setEndTime(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

      <input type="submit" className="btn btn-primary" value="Submit" />
    </form>
  );
};

TaskForm.prototype = {
  selectedProject: PropTypes.object.isRequired,
  setTaskCreate: PropTypes.bool.isRequired,
  createNewTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedProject: state.project.selectedProject
});

export default connect(mapStateToProps, { createNewTask })(TaskForm);
