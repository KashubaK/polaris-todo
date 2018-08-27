import React from 'react';
import { connect } from 'react-redux';

import { Card, TextField, Heading } from '@shopify/polaris';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './TodoDetails.css';

import { editTodo } from '../../actions';


class TodoDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todo: props.todo,
            text: ""
        }
    }
    
    handleTitleChange(newTitle) {
        this.setState({
            todo: {
                ...this.state.todo,
                title: newTitle
            }
        })
    }

    componentDidUpdate() {
        this.props.editTodo(this.state.todo)
    }

    handleChange(text) {
        this.setState({
            text,
            todo: {
                ...this.state.todo,

                body: text
            }
        })
    }

    render() {
        return (
            <div className="todo">
                <Card sectioned>
                    <div className="todo-header" style={{backgroundImage: `url(${this.state.todo.image})`}}>
                        <Heading element="h1">
                            <TextField
                                value={this.state.todo.title}
                                onChange={title => this.handleTitleChange(title)}
                                multiline
                            />
                        </Heading>
                    </div>

                    {process.env.ENV !== "test" && <ReactQuill value={this.state.todo.body}
                                onChange={text => this.handleChange(text)} />}
                </Card>
            </div>
        )
    }
}

export default connect(state => ({ todo: state.todo }), 
    dispatch => ({ 
        editTodo: (todo) => dispatch(editTodo(todo))
    })
)(TodoDetails);