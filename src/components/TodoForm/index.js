import React from 'react';
import { connect } from 'react-redux';

import { editTodo } from '../../actions';

import { Card, TextField, Heading } from '@shopify/polaris';

import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

import * as Showdown from 'showdown';

class TodoForm extends React.Component {
    converter: Showdown.Converter
    
    constructor(props) {
        super(props);

        this.state = {
            todo: props.todo,
            mdeState: { markdown: props.todo.body.markdown || "" }
        }


        this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
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

    handleBodyChange = (mdeState) => {
        this.setState({ mdeState, todo: { ...this.state.todo, body: { markdown: mdeState.markdown, html: mdeState.html } }});
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

                    <div className="todo-content">
                        <ReactMde
                            editorState={this.state.mdeState}
                            onChange={body => this.handleBodyChange(body)}
                            generateMarkdownPreview={(markdown) => Promise.resolve(
                                this.converter.makeHtml(markdown))}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(state => ({}), 
    dispatch => ({ 
        editTodo: (todo) => dispatch(editTodo(todo))
    })
)(TodoForm);