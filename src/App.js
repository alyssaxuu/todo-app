import React, { Component } from 'react';
import ToDo, { TASK_STATUSES } from './components/ToDo';
import './css/styles.css';
import Emoji from 'react-emoji-render';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: '',
			list: ['Check it out in GitHub', 'Made with ❤️ by Toni Codina', 'Try making a new task above 👆', 'Build your own!'],
			done: [],
			index: undefined,
			edit: false
		};
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.completeTodo = this.completeTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
	}

	componentWillMount() {
		const todo = localStorage.getItem('todo');
		const done = localStorage.getItem('done');
		if (todo !== null) {
			this.setState({ list: JSON.parse(todo) });
		}
		if (done !== null) {
			this.setState({ done: JSON.parse(done) });
		}
	}

	onChange = (event) => {
		this.setState({ task: event.target.value });
	}

	removeTodo(name, type) {
		let array, index;
		switch (type) {
			case TASK_STATUSES.TO_DO: {
				array = this.state.list;
				index = array.indexOf(name);
				array.splice(index, 1);
				this.setState({ list: array });
				localStorage.setItem('todo', JSON.stringify(array));
			} break;
			case TASK_STATUSES.DONE: {
				array = this.state.done;
				index = array.indexOf(name);
				array.splice(index, 1);
				this.setState({ done: array });
				localStorage.setItem('done', JSON.stringify(array));
			} break;
			default: {
				// nothing
			} break;
		}
	}

	completeTodo(name) {
		this.removeTodo(name, TASK_STATUSES.TO_DO);
		var join = this.state.done.slice();
		join.push(name);
		this.setState({ done: join });
		localStorage.setItem('done', JSON.stringify(join));
	}

	editTodo(name, index) {
		this.setState({ edit: true,  task: name,  index: index });
	}

	handleSave() {
		if (this.state.task !== '') {
			if (this.state.edit) {
				const list = this.state.list;
				list[this.state.index] = this.state.task;
				this.setState({
					task: '',  edit: false,  index: undefined, list: list
				}, () => {
					localStorage.setItem('todo', JSON.stringify(this.state.list));
				});
			} else {
				this.setState({
					task: '',
					list: [...this.state.list, this.state.task]
				}, () => {
					localStorage.setItem('todo', JSON.stringify(this.state.list));
					localStorage.setItem('done', JSON.stringify(this.state.done));
				});
			}
		}
	}

	handleCancel() {
		this.setState({
			task: '',			index: undefined,			edit: false
		})
	}

	handleKey = (event) => {
		if (event.key === 'Enter'){
			this.handleSave();
		}
		if (event.key === 'Escape') {
			this.handleCancel();
		}
	}

	render() {
		const actionDescription = (this.state.edit)? 'Edit this task' : 'Add a New' ;
		return (
			<div className="header">
				<h1>My tasks<Emoji text="✍" /></h1>
				<p>{actionDescription}</p>
				<input placeholder="Ex: Write a new blog post" maxLength={80} value={this.state.task} type='text' onKeyPress={this.handleKey} task={this.state.task} onChange={this.onChange}/>
				<button onClick={this.handleSave}>+</button>
				<button onClick={this.handleCancel}>-</button>
				<ToDo tasks={this.state.list} done={this.state.done} remove={this.removeTodo} complete={this.completeTodo} edit={this.editTodo}/>
			</div>
		);
	}
}
