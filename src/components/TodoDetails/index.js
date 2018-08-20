import React from 'react';
import { connect } from 'react-redux';

import { Card, Heading } from '@shopify/polaris';
import './TodoDetails.css';

import * as Showdown from 'showdown';

class TodoDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (`/${this.props.todo.id}` !== window.location.pathname) {
            // redirects to correct URL upon duplication
            window.location.href = `/${this.props.todo.id}`;
        }

        return (
            <div className="todo">
                <Card sectioned>
                    <div className="todo-header" style={{backgroundImage: `url(${this.props.todo.image})`}}>
                        <Heading element="h1">{`${this.props.todo.id}. ${this.props.todo.title}`}</Heading>
                    </div>

                    <div className="todo-content" dangerouslySetInnerHTML={{__html: this.props.todo.body.html }}></div>
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

    })
)(TodoDetails);