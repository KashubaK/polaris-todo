import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './TodoList.css';

import { Card, ResourceList, TextStyle, Link } from '@shopify/polaris';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { todos: [] };
    }

    filterTodos() {
        const todos = this.props.todos;
        
        return todos.filter(todo => {
            if (this.props.viewingIncomplete === true && todo.complete === false) {
                return true;
            } else if (this.props.viewingIncomplete === false && todo.complete === true) {
                return true;
            } else {
                return false;
            }
        })
    }

    render() {
        const { todos } = this.props;

        return (
            <div>
                <Card>
                    <div className="todo-list">
                        <ResourceList
                            resourceName={{singular: "todo", plural: "todos"}}
                            items={this.filterTodos()}
                            renderItem={todo => {
                                return (
                                    <ResourceList.Item
                                        id={todo.id}
                                        url={`/${todo.id}`}>
                                        <div className="todo-item">
                                            <div className="todo-item-badge" style={{ backgroundImage: `url(${todo.image})` }} />
                                            <h3>
                                                <TextStyle variation="strong">{todo.complete && "✓"} {todo.title}</TextStyle>
                                            </h3>
                                        </div>
                                    </ResourceList.Item>
                                )
                            }} />
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({
        todos: state.todos,
        viewingIncomplete: state.viewingIncomplete
    }),
    dispatch => ({})
)(TodoList);
