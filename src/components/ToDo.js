import React, { Component } from 'react';
import { Check } from 'react-feather';
import { X } from 'react-feather';
import Emoji from 'react-emoji-render';

export default class ToDo extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleDone = this.handleDone.bind(this);
  }
	handleChange(name, type) {
		this.props.remove(name, type);
	}
	handleDone(name) {
		this.props.complete(name);
	}
	render() {
		const rlist = this.props.tasks.map((list) =>
		<div key={list.toString()}>
			<li className="todo">{list}</li>
			<Check className="check" color="white" size={17} onClick={() => this.handleDone(list)} />
			<X className="cross" color="white" size={17} onClick={() => this.handleChange(list, 1)} />
		</div>
		);
		const dlist = this.props.done.map((done) =>
		<div key={done.toString()}>
			<li className="done">{done}</li>
			<X className="cross" color="white" size={17} onClick={() => this.handleChange(done, 2)} />
		</div>
		);
		return (
			<div>
				<ul>{rlist}</ul>
				{this.props.done.length ? <h1>Completed tasks <Emoji text="👏" /></h1> : ''}
				<ul>{dlist}</ul>
			</div>
		);
	}
}
