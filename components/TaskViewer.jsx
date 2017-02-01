import React from 'react';
import ReactDOM from 'react-dom';

class TaskViewer extends React.Component {
  constructor() {
    super();
    this.toogleTask = this.toogleTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }
   toogleTask() {
     this.props.toogleTask(this.props.task);
   };
   removeTask() {
      this.props.removeTask(this.props.task);
   };
   editTask() {
      this.props.editTask(this.props.task);
   };
   render() {
      return(
         <div className="taskViewer">
               <input type="checkbox" 
                  onChange={this.toogleTask} />
              <textarea className="textarea-view" disabled value={this.props.task.description} />
              <button className="task-deleteButton" onClick={this.removeTask}>Удалить</button> 
              <button className="task-editButton" onClick={this.editTask}>Редактировать</button>
           </div>
      );
   }
};

export default TaskViewer;