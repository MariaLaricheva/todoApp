import './App.css';
import React from 'react';
import Task from "./components/Task"
import TaskInput from "./components/TaskInput"

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            tasks: [
                {id: 0, title: "Create to-do app with React", done: false},
                {id: 1, title: "Add MobX to the project", done: true},
                {id: 2, title: "Add MobX to the metaclass project", done: false}
            ]
        }
    }

    doneTask = (id) => {
        const index = this.state.tasks.map(task => task.id).indexOf(id);
        this.setState(state => {
            let tasks = state.tasks;
            tasks[index].done = true;
            return tasks;
        })
    }

    deleteTask = (id) => {
        const index = this.state.tasks.map(task => task.id).indexOf(id);
        this.setState(state => {
            let tasks = state.tasks;
            delete tasks[index];
            // почему-то эта строчка не работает:
            // tasks.filter(task => task.id !== index)
            return tasks;
        })
    }

    addTask = task => {
        this.setState(state => {
            let { tasks } = state;
            let newTask = {
                id: tasks.length!== 0 ? tasks.length : 0,
                title: task,
                done: false
            };
            tasks.push(newTask);
            return tasks;
        })
    }

    render() {

        const { tasks } = this.state;
        const activeTasks = tasks.filter(task => !task.done);
        const doneTasks = tasks.filter(task => task.done);


        return(
            <div className="App">

                <h1 className="top">
                    Active tasks: {activeTasks.length}
                </h1>

                {[...activeTasks, ...doneTasks].map(task => (
                    <Task
                        task={task}
                        key={task.id}
                        //если передать функцию - она выполнится при рендере компонента
                        //а стрелочная функция сразу не выполнится
                        // поэтому используем стрелочные!!!
                        doneTask={() => this.doneTask(task.id)}
                        deleteTask={() => this.deleteTask(task.id)}
                    />
                ))}

                <TaskInput
                addTask={this.addTask}
                />
            </div>
        )
    }
}

export default App;
