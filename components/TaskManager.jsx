import React from 'react';
import ReactDOM from 'react-dom';
import ActiveTask from './ActiveTask.jsx';
import CompletedTask from './CompletedTask.jsx';


//localStorage.clear();
var tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

// Функция вычисления максимального значения id,
// среди существующих элементов
var getMaxIndex = function(array) {
   var indexes = [];
   array.map(function(task) {
      indexes.push(task.id);
   });
   if (indexes.length === 0) {
      return 0;
   };
   return Math.max.apply(null, indexes);
};

const htmlSeparator = 
      <div>
         <hr/>      
         <h4>Завершённые задачи</h4>
      </div>;

//Функция для отображения/скрытия разделителя завершённых задач
var getSeparator = function (tasks) {
   if (tasks.some(task => task.isActive === false)) {
       return htmlSeparator
   } else {
      return undefined;
   }
};

class TaskManager extends React.Component {
   constructor(props) {      
      super(props);      
      this.state = {
         tasks: this.props.tasks,
         newValue: "",
         tasksSeparator: getSeparator(this.props.tasks)
      };     
    this.toogleTask = this.toogleTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
     this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
   }
   toogleTask(task) {
     var tasksArray = this.props.tasks;
     for(var i = 0; tasksArray.length > i; i++) {
        var element = tasksArray[i];
        if (element.id === task.id)
            element.isActive = element.isActive 
               ? false 
               : true;
     }
     localStorage.setItem('tasks', JSON.stringify(tasksArray));
     this.setState({ 
        tasks: tasksArray,
        tasksSeparator: getSeparator(tasksArray)
     });  
   };
   editTask(task, value) {
       if (value) {
         var tasksArray = this.props.tasks;
         for(var i = 0; tasksArray.length > i; i++) {
            var element = tasksArray[i];
           if (element.id === task.id)
               element.description = value;
         }
         localStorage.setItem('tasks', JSON.stringify(tasksArray));
         this.setState({ tasks: tasksArray });
       }
   };
   removeTask(task) {     
     var tasksArray = this.props.tasks;
     for(var i = 0; tasksArray.length > i; i++) {
        if (tasksArray[i].id === task.id)
            tasksArray.splice(i, 1);
     }
     localStorage.setItem('tasks', JSON.stringify(tasksArray));
     this.setState({ tasks: tasksArray });  
   };
   addTask() {
      var tasksArray = this.props.tasks;      
      var index = getMaxIndex(tasksArray) + 1;  
      var description = this.state.newValue
         ? this.state.newValue
         : "Задача " + index;
      tasksArray.push({
         "id": index,
         "description": description,
         "isActive": true
      });
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
      this.setState({ 
         tasks: tasksArray,
         newValue: ""
      });
   };
   handleChange(event) {
      this.setState({ newValue: event.target.value });
   };
   handleKeyDown(event) {
      if(event.key === 'Enter'){
         this.addTask();
      }
   };
   render() {    
      var that = this;
      return(
         <div className="task-manager">
            <div className="addTask">
               <input type="text" 
                  onChange={this.handleChange} 
                  value={this.state.newValue}  
                  onKeyDown ={this.handleKeyDown}
                  placeholder='Введите новую задачу'/>
               <input type="submit" 
                  value="Добавить" 
                  onClick={this.addTask} />
            </div>
               
            <ul>
               {
                  this.state.tasks.map(function(task) {
                        if (task.isActive) {
                           return <ActiveTask
                                  key={task.id}
                                  task={task}
                                  removeTask={that.removeTask}
                                  toogleTask={that.toogleTask}
                                  editTask={that.editTask}                                  
                                  />  
                        }
                  })                                             
               }
            </ul>           
            {this.state.tasksSeparator}
            <ul>
               {
                  this.state.tasks.map(function(task) {                     
                     if (!task.isActive) {
                        return <CompletedTask
                                  key={task.id}
                                  task={task}
                                  toogleTask={that.toogleTask}/>  
                     }                
                  })                                             
               }
            </ul>
         </div>
      );
   }
};
              
ReactDOM.render(
  <TaskManager tasks={tasks}/>,
  document.getElementById("task-manager")
);
