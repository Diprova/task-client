import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllTasks, createNewTask, selectTask } from "../../actions/task";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const WorkPanel = ({
  getAllTasks,
  createNewTask,
  selectTask,
  tasks,
  selectedProject,
  selectedTask
}) => {
  const [taskCreate, setTaskCreate] = useState(false);

  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    getAllTasks(selectedProject);
  }, []);

  const onClick = val => {
    selectTask(val);
  };

  const onSubmit = () => {
    setTaskName("");

    createNewTask(taskName, selectedProject);
  };

  return (
    <div className="work container">
      <h1 className="text-center work-project">
        {selectedProject.projectName}
      </h1>
      {!taskCreate ? (
        <div
          className="btn btn-primary work-btn"
          onClick={() => setTaskCreate(true)}
        >
          Create New Task
        </div>
      ) : (
        <TaskForm setTaskCreate={setTaskCreate} />
      )}
      {tasks.length && tasks ? (
        tasks.map(e =>
          e._id === selectedTask._id ? (
            <TaskCard data={e} key={e._id} />
          ) : (
            <div
              key={e._id}
              className="work-card"
              onClick={() => selectTask(e)}
            >
              <div>{e.taskName}</div>
            </div>
          )
        )
      ) : (
        <div>you don't have any tasks. Create new one</div>
      )}
    </div>
  );
};

WorkPanel.prototype = {
  getAllTasks: PropTypes.func.isRequired,
  createNewTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  selectedProject: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selectedProject: state.project.selectedProject,
  selectedTask: state.task.selectedTask,
  tasks: state.task.tasks
});

export default connect(mapStateToProps, {
  getAllTasks,
  createNewTask,
  selectTask
})(WorkPanel);
