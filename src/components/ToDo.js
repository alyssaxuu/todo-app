import React from 'react';
import { Check, Edit, X } from 'react-feather';
import Emoji from 'react-emoji-render';

export const TASK_STATUSES = {
	TO_DO: 'TO_DO',
	DONE: 'DONE'
};

export default (props) => {
	const handleChange = (name, type) => {
		props.remove(name, type);
	};
	const handleDone = (name) => {
		props.complete(name);
	};
	const handleEdit = (name, index) => {
		props.edit(name, index);
	}
	const rlist = props.tasks.map((list, idx) =>
		<div key={idx}>
			<li className="todo">{list}</li>
			<Edit className="edit" color="white" size={17} onClick={() => handleEdit(list, idx)} />
			<Check className="check" color="white" size={17} onClick={() => handleDone(list)} />
			<X className="cross" color="white" size={17} onClick={() => handleChange(list, TASK_STATUSES.TO_DO)} />
		</div>
	);
	const dlist = props.done.map((done, idx) =>
		<div key={idx}>
			<li className="done">{done}</li>
			<X className="cross" color="white" size={17} onClick={() => handleChange(done, TASK_STATUSES.DONE)} />
		</div>
	);

	return (
		<div>
			<ul>{rlist}</ul>
			{props.done.length && <h1>Completed tasks <Emoji text="👏" /></h1>}
			<ul>{dlist}</ul>
		</div>
	);
}
