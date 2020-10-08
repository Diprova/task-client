import {
  CREATE_NEW_TASK,
  RETRIEVE_TASKS,
  SELECT_TASK,
  REMOVE_TASKS,
  TIMER_STARTED,
  TIMER_STOPPED
} from "../actions/types";

const initialState = { tasks: [], selectedTask: {} };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NEW_TASK:
      return { ...state, tasks: [...state.tasks, payload] };

    case RETRIEVE_TASKS:
      return {
        ...state,
        tasks: [...payload],
        selectedTask: payload ? { ...payload[0] } : {}
      };

    case SELECT_TASK:
    case TIMER_STARTED:
    case TIMER_STOPPED:
      return { ...state, selectedTask: { ...payload } };

    case REMOVE_TASKS:
      return { tasks: [], selectedTask: {} };

    default:
      return state;
  }
}
