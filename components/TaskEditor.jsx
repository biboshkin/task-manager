import React from 'react';  
import ReactDOM from 'react-dom';

class TaskEditor extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: props.task.description
      };
	  this.handleChange = this.handleChange.bind(this);
	  this.editTask = this.editTask.bind(this);
   };
   editTask() {
      this.props.editTask(this.props.task, this.state.value);
   };
   handleChange(event) {
      this.setState({ value: event.target.value }); 
   };
   render() {
      return(
         <div className="taskEditor">
              <input type="checkbox" disabled/>
              <textarea className="textarea-edit" value={this.state.value} onChange={this.handleChange} />
              <button className="task-saveButton" onClick={this.editTask}>Cохранить</button>
           </div>
      );
   }
};

export default TaskEditor;