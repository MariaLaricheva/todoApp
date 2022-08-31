import {action, computed, makeObservable, observable} from "mobx"

class Store {
    tasks = [
        {id: 0, title: "Create to-do app with React", done: false},
        {id: 1, title: "Add MobX to the project", done: true},
        {id: 2, title: "Add MobX to the metaclass project", done: false}
    ];

    setTask( payload) {
        this.tasks = payload;
    }

    get activeTasks() {
        return this.tasks.filter(task => !task.done).length
    }

    get sortedTasks() {
        return this.tasks.slice().sort((a,b) => a.done === b.done ? 0 : a.done ? 1 : -1)
    }

    addTask(task) {
        let tasks = this.tasks;
        let newTask = {
            id: tasks.length || 0,
            title: task,
            done: false
        };
        tasks.push(newTask);
        this.setTask(tasks)
    }

    doneTask = (id) => {
        let tasks = this.tasks;
        const index = tasks.map(task => task.id).indexOf(id);
        tasks[index].done = true;

        this.setTask(tasks);
    }

    deleteTask = (id) => {
        this.setTask(this.tasks.filter(item => item.id !== id));
    }

    constructor() {
        makeObservable(this, {
            tasks: observable,
            activeTasks: computed,
            sortedTasks: computed,
            addTask: action,
            deleteTask: action,
            doneTask: action
        });
    }
}


export default new Store();