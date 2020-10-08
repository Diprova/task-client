import { setAlert } from "./alert";
import {
  PROJECT_RETRIEVE,
  PROJECT_ADD,
  SELECT_PROJECT,
  REMOVE_PROJECTS
} from "./types";
import axios from "axios";
import { getAllTasks } from "./task";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const BASE_URL = "http://localhost:3000";

// Get All Projects
export const getAllProjects = () => async dispatch => {
  try {
    const res = await axios.get(`${BASE_URL}/api/project`);

    dispatch({ type: PROJECT_RETRIEVE, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REMOVE_TASKS });
  }
};

// Create New Project
export const createNewProject = projectName => async dispatch => {
  const body = JSON.stringify({ projectName });
  try {
    const res = await axios.post(`${BASE_URL}/api/project`, body, config);
    dispatch({ type: PROJECT_ADD, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Select a Project
export const selectProject = data => dispatch => {
  dispatch({ type: SELECT_PROJECT, payload: data });
  dispatch(getAllTasks(data));
};

// Remove Projects
export const removeProjects = () => dispatch => {
  dispatch({ type: REMOVE_PROJECTS });
};
