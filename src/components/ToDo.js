import React, {Component} from 'react';
import {Check} from 'react-feather';
import {X} from 'react-feather';
import Emoji from 'react-emoji-render';

export const TASK_STATUSES = {
    TO_DO: 'TO_DO',
    DONE: 'DONE'
};

class ToDo extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(name, type) {
        this.props.remove(name, type);
    }

    handleDone(name) {
        this.props.complete(name);
    }

    render() {
        const rlist = this.props.tasks.map((list, idx) =>
            <div key={idx}>
                <li className="todo">{list}</li>
                <Check className="check" color="white" size={17} onClick={() => this.handleDone(list)}/>
                <X className="cross" color="white" size={17} onClick={this.handleChange.bind(this, list, TASK_STATUSES.TO_DO)}/>
            </div>
        );

        const dlist = this.props.done.map((done, idx) =>
            <div key={idx}>
                <li className="done">{done}</li>
                <X className="cross" color="white" size={17} onClick={this.handleChange.bind(this, done, TASK_STATUSES.DONE)}/>
            </div>
        );

        return (
            <div>
                <ul>{rlist}</ul>
                {this.props.done.length ? <h1>Completed tasks <Emoji text="👏"/></h1> : ''}
                <ul>{dlist}</ul>
            </div>
        );
    }
}

export default ToDo;