import React from "react";

export class TaskInput extends React.Component {
    constructor() {
        super();

        this.state = {
            input: '',
        };
    }

    addTask = () => {
        const {input} = this.state;
        if(input){
            this.props.addTask(input);
            this.setState({input:''})
        }
    }

    inputChange = event => {
        this.setState({input: event.target.value})
    }

    handleEnter = event => {
        if (event.key === "Enter"){
            this.addTask();
        }
    }

    render() {
        const {input} = this.state;

        return(
            <div className="Task input">
                <input
                    onChange={this.inputChange} value={input}
                    onKeyPress={this.handleEnter}
                />
                <button
                    onClick={this.addTask}
                >ADD</button>
            </div>
        )
    }
}

export default TaskInput;