import React, { Component } from 'react';
import ToDo from './components/ToDo';
import './css/styles.css';
import Emoji from 'react-emoji-render';
import Cookies from 'universal-cookie';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: '',
			list: ['Check it out in GitHub', 'Made with ❤️ by Toni Codina', 'Try making a new task above 👆', 'Build your own!', 'This site uses 🍪 to keep track of your tasks'],
			done: []
		};
		this.handleClick = this.handleClick.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.completeTodo = this.completeTodo.bind(this);
	}
	componentWillMount() {
		const cookies = new Cookies();
		if (cookies.get('todo') !== undefined) {
			this.setState({
				list: cookies.get('todo')
			});
		}
		if (cookies.get('done') !== undefined) {
			this.setState({
				done: cookies.get('done')
			});
		}
	}
	onChange = (event) => {
		this.setState({ task: event.target.value });
	}
	removeTodo(name, type) {
		const cookies = new Cookies();
		let array, index;
		if (type === 1) {
			array = this.state.list;
			index = array.indexOf(name);
			array.splice(index, 1);
			this.setState({
				list: array
			});
			cookies.set('todo', JSON.stringify(array), { path: '/'});
		} else {
			array = this.state.done;
			index = array.indexOf(name);
			array.splice(index, 1);
			this.setState({
				done: array
			});
			cookies.set('done', JSON.stringify(array), { path: '/'});
		}
	}
	completeTodo(name) {
		const cookies = new Cookies();
		this.removeTodo(name, 1);
		var join = this.state.done.slice();
		join.push(name);
		this.setState({
			done: join
		});
		cookies.set('done', JSON.stringify(join), { path: '/'});
	}
	handleClick() {
		if (this.state.task !== '') {
			this.setState({
				task: '',
				list: [...this.state.list, this.state.task]
			}, () => {
				const cookies = new Cookies();
				cookies.set('todo', JSON.stringify(this.state.list), { path: '/'});
				cookies.set('done', JSON.stringify(this.state.done), { path: '/'});
			});
		}
	}
	handleKey = (event) => {
		if (event.key === 'Enter'){
			this.handleClick();
		}
	}
	render() {
		return (
			<div className="header">
				<h1>My tasks<Emoji text="✍" /></h1>
				<input placeholder="Ex: Write a new blog post" maxLength={80} value={this.state.task} type='text' onKeyPress={this.handleKey} task={this.state.task} onChange={this.onChange}/>
				<button onClick={this.handleClick}>+</button>
				<ToDo tasks={this.state.list} done={this.state.done} remove={this.removeTodo} complete={this.completeTodo}/>
			</div>
		);
	}
}
