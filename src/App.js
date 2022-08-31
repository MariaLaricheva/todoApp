import './App.css';
import React from 'react';
import Task from "./components/Task"
import TaskInput from "./components/TaskInput"
import {observer} from "mobx-react";
import store from "./store";

class App extends React.Component{

    render() {

        const { sortedTasks, activeTasks } = store;

        return(
            <div className="App">

                <h1 className="top">
                    Active tasks: {activeTasks}
                </h1>

                {sortedTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        //если передать функцию - она выполнится при рендере компонента
                        //а стрелочная функция сразу не выполнится
                        // поэтому используем стрелочные!!!
                        doneTask={() => store.doneTask(task.id)}
                        deleteTask={() => store.deleteTask(task.id)}
                    />
                ))}

                <TaskInput addTask={v => store.addTask(v)} />
            </div>
        )
    }
}

//обзервер нужен чтобы приложение ререндерилось
export default observer(App);
