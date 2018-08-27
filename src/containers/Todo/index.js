import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Redirect } from 'react-router-dom';
 
import { Layout, Page, useLinkComponent } from '@shopify/polaris';

import { completeTodo, selectTodo, duplicateTodo } from '../../actions';

import TodoDetails from '../../components/TodoDetails';
import PropTypes from 'prop-types';

 
class Todo extends React.Component {
    constructor(props) {
        super(props);
        
        const todo = this.props.todos.find(_todo => _todo.id === parseInt(this.props.match.params.id));
        this.props.selectTodo(todo);

        this.state = {
            editing: false
        }
    }

    handlePrimaryAction() {
        this.props.completeTodo(this.props.todo)
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

        const todo = this.props.todo || {};

        return (
            <Layout>
                <Layout.Section>
                    <Page
                        breadcrumbs={[{ content: 'Todos', url: '/' }]}
                        title={todo.complete ? `✓ ${todo.title}` : todo.title}
                        primaryAction={{ content: todo.complete ? "Mark as incomplete" : "Mark as complete", onAction: () => { this.handlePrimaryAction() }}}
                        secondaryActions={[
                            { content: 'Duplicate', onAction: () => { this.handleSecondaryAction(); } }
                        ]}
                        pagination={{
                            hasNext: nextURL ? true : false,
                            nextURL,

                            hasPrevious: previousURL ? true : false,
                            previousURL
                        }}>
                           
                        <TodoDetails />
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
        completeTodo: todo => dispatch(completeTodo(todo)),
        selectTodo: todo => dispatch(selectTodo(todo)),
        duplicateTodo: todo => dispatch(duplicateTodo(todo))
    })
)(Todo);