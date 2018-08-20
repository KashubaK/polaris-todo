import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Redirect } from 'react-router-dom';
 
import { Layout, Page, useLinkComponent } from '@shopify/polaris';

import { editTodo, selectTodo, duplicateTodo } from '../../actions';

import TodoDetails from '../../components/TodoDetails';
import TodoForm from '../../components/TodoForm';
import PropTypes from 'prop-types';

 
class Todo extends React.Component {
    constructor(props) {
        super(props);
        
        const todo = this.props.todos.find(_todo => _todo.id === parseInt(this.props.match.params.id));
        //this.props.selectTodo(todo);

        this.state = {
            editing: false
        }
    }

    handlePrimaryAction() {
        this.setState({
            editing: !this.state.editing
        });
    }

    handleSecondaryAction() {
        this.props.duplicateTodo(this.props.todo);
    }

    prevTodoURL() {
        const currentIndex = this.props.todos.indexOf(this.props.todo);
        const prevTodo = this.props.todos[currentIndex - 1];

        if (prevTodo) {
            return `/${prevTodo.id}`
        } else {
            return false;
        }
    }

    nextTodoURL() {
        const currentIndex = this.props.todos.indexOf(this.props.todo);
        const nextTodo = this.props.todos[currentIndex + 1];

        if (nextTodo) {
            return `/${nextTodo.id}`
        } else {
            return false;
        }
    }

    render() {
        const nextURL = this.nextTodoURL();
        const previousURL = this.prevTodoURL();

        console.log(this.props)

        return (
            <Layout>
                <Layout.Section>
                    <Page
                        breadcrumbs={[{ content: 'Todos', url: '/' }]}
                        title={this.props.todo.title}
                        primaryAction={{ content: this.state.editing ? "Save" : "Edit", onAction: () => { this.handlePrimaryAction() }}}
                        secondaryActions={[{ content: 'Duplicate', onAction: () => { this.handleSecondaryAction(); } }]}
                        pagination={{
                            hasNext: nextURL ? true : false,
                            nextURL,

                            hasPrevious: previousURL ? true : false,
                            previousURL
                        }}>
                           
                        {this.state.editing && <TodoForm todo={this.props.todo} />}
                        {!this.state.editing && <TodoDetails />}
                    </Page>
                </Layout.Section>
            </Layout>
        )
    }
}

export default connect(
    state => ({
        todos: state.todos,
        todo: state.todo
    }), 
    dispatch => ({ 
        editTodo: todo => dispatch(editTodo(todo)),
        selectTodo: todo => dispatch(selectTodo(todo)),
        duplicateTodo: todo => dispatch(duplicateTodo(todo))
    })
)(Todo);