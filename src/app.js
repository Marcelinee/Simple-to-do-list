import React from 'react';
import ReactDOM from 'react-dom';

import {restoreTasksDatabase, updateTasksDatabase} from "./list.js"

import "normalize-css/normalize.css"
import "./css/style.scss";

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: [],
        };
    }

    componentDidMount() {
        var that = this; 
        var tasksRestore;

        setTimeout(function() {
            restoreTasksDatabase(function(tasks) {
                tasksRestore = tasks;
                that.setState({options: tasksRestore.list});
            })
        }, 100);

    }

    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            } 
        }, function() {updateTasksDatabase("tasks", this.state.options)})
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => {return optionToRemove !== option ? true : false;})
            } 
        }, function() {updateTasksDatabase("tasks", this.state.options)})
    }

    handlePick() {
        this.setState(() => {
            alert(this.state.options[Math.floor(Math.random()*this.state.options.length)]);
        })
    }

    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item'
        }
        else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }
        
        this.setState((prevState) => {
            return {
                options: prevState.options.concat([option])
            }
        }, function() {updateTasksDatabase("tasks", this.state.options)}
        )
    }

    render() {
        const title = 'ToDo list'

        const options = []
        return (
            <div>
                <Header title={title}  />
                <div className="container">
                    <div  className = "options__background">
                    <Options options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}/>
                    <Add 
                    handleAddOption = {this.handleAddOption}/>
                    </div>
                    
                </div>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <h1 className="header__title">{this.props.title}</h1>
                    <h2 className="header__sub">What would you like to do today?</h2>
                </div>
            </div>
        );
    }
}

class Options extends React.Component {

    render() {
        return (
            <div>
                <div className="options">
                    <h3 className="options_h3">Your tasks</h3>
                    <button onClick={this.props.handleDeleteOptions}
                    className="button--link">Remove all</button> 
                </div>
            <div>
            {this.props.options.length === 0 && <p className="options__p">Add tasks to get started</p>}
            {
                this.props.options.map((option, index) => 
                <Option key={option} 
                optionText={option}
                count = {index + 1}
                handleDeleteOption={this.props.handleDeleteOption}/>)
            }
            </div>
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div  className="options__below">
            <p className="options__text">
                {this.props.count}. {this.props.optionText}
            </p>
            <button className="button--link" onClick={(e) => {
                this.props.handleDeleteOption(this.props.optionText);}}>
            Remove</button>
            </div>
        );
    }
}

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value;
        const error = this.props.handleAddOption(option);
        this.setState(() => {
            return { error };
        });
    }
    render() {
        return  ( 
            <div>
            {this.state.error && <p className="add__error">{this.state.error}</p>}
                <form className="add__option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type='text' name="option"></input>
                    <button className="button__add">Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<ToDoApp />, document.getElementById('app'))

/*class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.reset = this.reset.bind(this);
        this.substract = this.substract.bind(this);
        this.state = {
            count: 0
        };
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.add}>+1</button>
                <button onClick={this.substract}>-1</button>
                <button onClick={this.reset}>reset</button>
            </div>
        )
    }
    add() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });     

    };
    substract() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        }); 
    };
    reset() {
        this.setState(() => {
            return {
                count: 0
            }
        }); 
    };

}

ReactDOM.render(<Counter />, document.getElementById("app"));*/