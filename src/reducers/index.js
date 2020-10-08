import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import project from "./project";
import task from "./task";

export default combineReducers({ alert, auth, project, task });
