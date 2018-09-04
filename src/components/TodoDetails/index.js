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
    }
    
    handleTitleChange(title) {
        this.props.editTodo({
            ...this.props.todo,
            title
        })
    }

    handleChange(body) {
        this.props.editTodo({
            ...this.props.todo,
            body
        })
    }

    render() {
        return (
            <div className="todo">
                <Card sectioned>
                    <div className="todo-header" style={{backgroundImage: `url(${this.props.todo.image})`}}>
                        <Heading element="h1">
                            <TextField
                                value={this.props.todo.title}
                                onChange={title => this.handleTitleChange(title)}
                                multiline
                            />
                        </Heading>
                    </div>

                    {process.env.ENV !== "test" && <ReactQuill value={this.props.todo.body}
                                onChange={text => this.handleChange(text)} />}

                    {process.env.ENV == "test" && <TextField value={this.props.todo.body}
                                onChange={text => this.handleChange(text)} multiline />}
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({ 
        todo: state.todo 
    }), 
    dispatch => ({ 
        editTodo: (todo) => dispatch(editTodo(todo))
    })
)(TodoDetails);