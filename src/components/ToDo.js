import React from 'react';
import { Check } from 'react-feather';
import { X } from 'react-feather';
import Emoji from 'react-emoji-render';

export default (props) => {
	const handleChange = (name, type) => {
		props.remove(name, type);
	};
	const handleDone = (name) => {
		props.complete(name);
	};
	const rlist = props.tasks.map((list) =>
		<div key={list.toString()}>
			<li className="todo">{list}</li>
			<Check className="check" color="white" size={17} onClick={() => handleDone(list)} />
			<X className="cross" color="white" size={17} onClick={() => handleChange(list, 1)} />
		</div>
	);
	const dlist = props.done.map((done) =>
		<div key={done.toString()}>
			<li className="done">{done}</li>
			<X className="cross" color="white" size={17} onClick={() => handleChange(done, 2)} />
		</div>
	);

	return (
		<div>
			<ul>{rlist}</ul>
			{props.done.length ? <h1>Completed tasks <Emoji text="👏" /></h1> : ''}
			<ul>{dlist}</ul>
		</div>
	);
}
