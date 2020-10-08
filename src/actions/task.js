import { setAlert } from "./alert";
import {
  RETRIEVE_TASKS,
  CREATE_NEW_TASK,
  SELECT_TASK,
  REMOVE_TASKS,
  TIMER_STARTED,
  TIMER_STOPPED
} from "./types";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const BASE_URL = "http://localhost:3000";

// Get all Tasks
export const getAllTasks = selectedProject => async dispatch => {
  const body = JSON.stringify({ selectedProject });
  try {
    const res = await axios.post(`${BASE_URL}/api/task/all`, body, config);

    dispatch({ type: RETRIEVE_TASKS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REMOVE_TASKS });
  }
};

// Create New Task
export const createNewTask = ({
  taskName,
  projectId,
  startTime,
  endTime
}) => async dispatch => {
  const body = JSON.stringify({ taskName, projectId, startTime, endTime });
  try {
    const res = await axios.post(`${BASE_URL}/api/task`, body, config);

    setAlert("Task Created", "success");
    dispatch({ type: CREATE_NEW_TASK, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Select a task
export const selectTask = data => dispatch => {
  dispatch({ type: SELECT_TASK, payload: data });
};

// Remove Tasks
export const removeTasks = () => dispatch => {
  dispatch({ type: REMOVE_TASKS });
};

// Timer Started for Task
export const startTimer = ({ taskId, activeTime }) => async dispatch => {
  const body = JSON.stringify({ taskId, activeTime });
  try {
    const res = await axios.put(`${BASE_URL}/api/task/start`, body, config);

    dispatch({ type: TIMER_STARTED, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Timer Stopped
export const stopTimer = ({ taskId, currentTime }) => async dispatch => {
  const body = JSON.stringify({ taskId, currentTime });

  try {
    const res = await axios.put(`${BASE_URL}/api/task/stop`, body, config);

    dispatch({ type: TIMER_STOPPED, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
