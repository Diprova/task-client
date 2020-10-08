import {
  PROJECT_RETRIEVE,
  PROJECT_ADD,
  SELECT_PROJECT,
  REMOVE_PROJECTS
} from "../actions/types";

const initialState = { projects: [], selectedProject: {} };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_RETRIEVE:
      return {
        ...state,
        projects: [...payload],
        selectedProject: { ...payload[0] }
      };

    case PROJECT_ADD:
      return { ...state, projects: [...state.projects, payload] };

    case SELECT_PROJECT:
      return { ...state, selectedProject: { ...payload } };

    case REMOVE_PROJECTS:
      return { projects: [], selectedProject: {} };

    default:
      return state;
  }
}
