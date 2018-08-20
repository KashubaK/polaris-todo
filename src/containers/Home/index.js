import React from 'react';
import { newTodo } from '../../actions';
 
import { Layout, Page, Spinner } from '@shopify/polaris';
import TodoList from '../../components/TodoList';

import { connect } from 'react-redux';
import * as axios from 'axios';
 
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { progress: false };
    }

    
    handlePrimaryAction() {
        const _this = this;

        this.setState({ progress: true });

        axios.get('https://source.unsplash.com/random/1920x1080')
            .then(response => {
                const image = response.request.responseURL;

                if (this.props.todos.find(todo => todo.image === image)) {
                    this.handlePrimaryAction();
                } else {
                    this.props.newTodo({ image });
    
                    this.setState({
                        progress: false
                    })
                }
            })
    }

    render() {
        return (
            <Layout>
                <Layout.Section>
                    <Page
                        title="Todos"
                        primaryAction={{ content: "Add todo", loading: this.state.progress, onAction: () => this.handlePrimaryAction() }}
                        >

                        <TodoList />
                    </Page>
                </Layout.Section>
            </Layout>
        )
    }
}

export default connect(
    state => ({
        todos: state.todos
    }),
    dispatch => ({ 
        newTodo: todo => dispatch(newTodo(todo))
    })
)(Home);