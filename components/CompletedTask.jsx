import React from 'react';
import ReactDOM from 'react-dom';

class CompletedTask extends React.Component {
  constructor() {
    super();
    this.toogleTask = this.toogleTask.bind(this);
  };
  toogleTask() {
     this.props.toogleTask(this.props.task);
  };
  render() {
     return (
        <li className="completedTask">
           <div className="taskViewer">
              <input type="checkbox" checked disabled/>
              <textarea className="textarea-completed" disabled value={this.props.task.description} />
              <button className="task-toogleButton" onClick={this.toogleTask}>Восстановить</button>
           </div>
        </li>
      );
  } 
};

export default CompletedTask;