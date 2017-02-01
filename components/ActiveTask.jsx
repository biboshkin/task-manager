import React from 'react';
import ReactDOM from 'react-dom';
import TaskViewer from './TaskViewer.jsx';
import TaskEditor from './TaskEditor.jsx';

class ActiveTask extends React.Component {
   constructor() {
      super();
      this.state = {
         viewMode: true
      }
   };
   toogleTask(task) {
     this.props.toogleTask(task);
   };
   removeTask(task) {
      this.props.removeTask(task);
   };
   editTask(task, value) {
    this.props.editTask(task, value);
      if (value) {         
         this.setState({ viewMode: true }); 
      } else {
         this.setState({ viewMode: false }); 
      };
    this.toogleTask = this.toogleTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
   };
   render() {
     return (
        <li className="activeTask">
           {this.state.viewMode 
              ? <TaskViewer 
                   task={this.props.task}
                   toogleTask={this.toogleTask.bind(this)}
                   removeTask={this.removeTask.bind(this)} 
                   editTask={this.editTask.bind(this)}/>
              : <TaskEditor
                   task={this.props.task}
                   editTask={this.editTask.bind(this)}/>
           }
        </li>
      );
  }
};

export default ActiveTask;