import React, {Component} from 'react';
import ToDo, { TASK_STATUSES } from './components/ToDo';
import './css/styles.css';
import Emoji from 'react-emoji-render';
import Cookies from 'universal-cookie';

class Home extends Component {
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
        this.setState({task: event.target.value});
    };

    removeTodo(name, type) {
        switch (type) {
            case TASK_STATUSES.TO_DO: {
                const cookies = new Cookies();
                var array = this.state.list;
                var index = array.indexOf(name);
                array.splice(index, 1);
                this.setState({
                    list: array
                });
                cookies.set('todo', JSON.stringify(array), {path: '/'});
            } break;
            case TASK_STATUSES.DONE: {
                const cookies = new Cookies();
                var array = this.state.done;
                var index = array.indexOf(name);
                array.splice(index, 1);
                this.setState({
                    done: array
                });
                cookies.set('done', JSON.stringify(array), {path: '/'});
            } break;
            default: {
                // nothing
            } break;
        }
    }

    completeTodo(name) {
        const cookies = new Cookies();
        this.removeTodo(name, TASK_STATUSES.TO_DO);
        var join = this.state.done.slice();
        join.push(name);
        this.setState({
            done: join
        });
        cookies.set('done', JSON.stringify(join), {path: '/'});
    }

    handleClick() {
        if (this.state.task !== '') {
            this.setState({
                task: '',
                list: [...this.state.list, this.state.task]
            }, () => {
                const cookies = new Cookies();
                cookies.set('todo', JSON.stringify(this.state.list), {path: '/'});
                cookies.set('done', JSON.stringify(this.state.done), {path: '/'});
            });
        }
    }

    handleKey = (event) => {
        if (event.key == 'Enter') {
            this.handleClick();
        }
    }

    render() {
        return (
            <div className="header">
                <h1>My tasks<Emoji text="✍"/></h1>
                <input placeholder="Ex: Write a new blog post" maxLength={80} value={this.state.task} type='text'
                       onKeyPress={this.handleKey} task={this.state.task} onChange={this.onChange}/>
                <button onClick={this.handleClick}>+</button>
                <ToDo tasks={this.state.list} done={this.state.done} remove={this.removeTodo}
                      complete={this.completeTodo}/>
            </div>
        );
    }
}

export default Home;