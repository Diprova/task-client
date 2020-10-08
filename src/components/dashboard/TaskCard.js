import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { startTimer, stopTimer } from "../../actions/task";
import momentDurationFormatSetup from "moment-duration-format";

const TaskCard = ({ data, startTimer, stopTimer, selectedTask }) => {
  const { _id, workedTime, activeTime, isActive, isCompleted } = selectedTask;
  const [timer, setTimer] = useState("");

  useEffect(() => {
    if (workedTime) {
      setTimer(
        moment.duration(workedTime, "milliseconds").format("hh:mm:ss", {
          trim: false
        })
      );
    }
  }, [workedTime]);

  useEffect(() => {
    if (activeTime) {
      let timeNow = Date();
      let pt = moment(activeTime);
      let ct = moment(timeNow);
      let diff = pt.diff(ct);
      if (diff < 0) {
        diff = Math.abs(diff);
      }

      let time;
      setTimeout(() => {
        if (workedTime) {
          time = +diff + +workedTime;
          setTimer(
            moment.duration(time, "milliseconds").format("hh:mm:ss", {
              trim: false
            })
          );
        } else {
          time = diff;
          setTimer(
            moment.duration(time, "milliseconds").format("hh:mm:ss", {
              trim: false
            })
          );
        }
      }, 1000);
    }
  }, [timer, isActive]);

  const handleStop = () => {
    let taskId = _id;
    let currentTime = Date();
    stopTimer({ taskId, currentTime });
  };

  const handleStart = e => {
    let taskId = _id;
    let activeTime = Date();
    startTimer({ taskId, activeTime });

    setTimeout(() => {
      setTimer(
        moment.duration(+workedTime + 1000, "milliseconds").format("hh:mm:ss", {
          trim: false
        })
      );
    }, 1010);
  };

  const handleDone = () => {};


  return (
    <div className="task work-card">
      <div className="task-name">
        <i className="text-gray">Name : </i>
        {data.taskName}
      </div>
      <div>
        <i className="text-gray">Start Time : </i>
        {data.startTime}
      </div>
      <div>
        <i className="text-gray">End Time : </i>
        {data.endTime}
      </div>
      {isCompleted ? (
        <div className="btn btn-success">COMPLETED</div>
      ) : (
        <Fragment>
          <div>
            <i className="text-gray">Total Worked : </i>
            {timer}
          </div>
          {isActive ? (
            <div className="btn btn-danger" onClick={e => handleStop(e)}>
              STOP
            </div>
          ) : (
            <div className="btn btn-success" onClick={e => handleStart(e)}>
              START
            </div>
          )}
          <div className="btn btn-primary" onClick={e => handleDone(e)}>
            DONE
          </div>
        </Fragment>
      )}
    </div>
  );
};

TaskCard.prototype = {
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ selectedTask: state.task.selectedTask });

export default connect(mapStateToProps, { startTimer, stopTimer })(TaskCard);
