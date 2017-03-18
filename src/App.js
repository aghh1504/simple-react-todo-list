import React, { Component } from 'react'
import './App.css'
import List from './List'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      items: []
    }
  }

  onChange = (event) => {
    this.setState({term: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.state.items.push(this.state.term)
    this.setState({term: '', items: this.state.items})
  }

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.onSubmit}>
            <input value={this.state.term} onChange={this.onChange} />
            <button>Submit</button>
        </form>
        <List items={this.state.items}/>
      </div>
    )
  }
}
