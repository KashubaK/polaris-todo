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

    render() {
        const { todos } = this.props;

        return (
            <Card>
                <div className="todo-list">
                    <ResourceList
                        resourceName={{singular: "todo", plural: "todos"}}
                        items={todos}
                        renderItem={todo => {
                            return (
                                <ResourceList.Item
                                    id={todo.id}
                                    url={`/${todo.id}`}>
                                    <div className="todo-item">
                                        <div className="todo-item-badge" style={{ backgroundImage: `url(${todo.image})` }} />
                                        <h3>
                                            <small>{todo.id}. </small>

                                            <TextStyle variation="strong">{todo.title}</TextStyle>
                                        </h3>
                                    </div>
                                </ResourceList.Item>
                            )
                        }} />
                </div>
            </Card>
        )
    }
}

export default connect(
    state => ({
        todos: state.todos
    }),
    dispatch => ({})
)(TodoList);
