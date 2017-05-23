import React, { Component } from 'react';
import './App.css';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: []
    };

  }

  componentDidMount() {
    fetch('https://todo-api-london.now.sh/lists', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        list: {
          name: 'my list'
        }
      })
    })
    .then((res) => res.json())
    .then(data => {
      this.setState({
        listId: data.list.id
      });
    });
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();

    fetch('https://todo-api-london.now.sh/items', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        item: {
          list_id: this.state.listId,
          description: this.state.term
        }
      })
    })
    .then(res =>
      fetch(`https://todo-api-london.now.sh/lists/${this.state.listId}`)
    )
    .then(res => res.json())
    .then(data => {
      this.setState({
        items: data.list.items
      });
    });
  }

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Submit</button>
        </form>
        <List items={this.state.items.map(item => item.description)} />
      </div>
    );
  }
}
