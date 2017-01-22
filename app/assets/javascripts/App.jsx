class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {todos: [], hostname: ''}
    this.addTodo = this.addTodo.bind(this)
    this.getData = this.getData.bind(this)
    this.toggleDone = this.toggleDone.bind(this)
  }

  getData() {
    $.get('/rest/todos', function(data) {
      this.setState({todos: data})
    }.bind(this))

    $.get('/rest/hostname', function(data) {
      this.setState({hostname: data})
    }.bind(this))
  }

  componentDidMount() {
    this.getData()
  }

  addTodo(description) {
    $.ajax({type: 'POST', url: '/rest/todo', data: description, success: function(data) {
      this.getData()
    }.bind(this)})
  }

  toggleDone(id, done) {
    $.ajax({type: 'PUT', url: '/rest/todo/' + id, data: done + '', success: function(data) {
      this.getData()
    }.bind(this)})
  }

	render() {
	  var todos = []
      this.state.todos.forEach(function(todo) {
      todos.push(<TodoItem value={todo} toggleDone={this.toggleDone}/>)
    }.bind(this));
	  return (
	    <div style={{display: "flex", flexDirection: "column"}}>
        <h2>Todo List</h2>
	      {todos}
	      <NewTodoItem handleAddTodo={this.addTodo}/>
        <div>Running on {this.state.hostname}</div>
	    </div>
	  )
	}
}

class TodoItem extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
      if(this.props.toggleDone) {
        this.props.toggleDone(this.props.value.id, !this.props.value.done)
      }
	}

	render() {
	  return (
	    <div style={{display: 'inline-flex', width: "100%"}}>
	      <input type='checkbox' checked={this.props.value.done} onChange={this.handleChange}/>
        <div style={{flexGrow: 1}}> {this.props.value.description}</div>
	    </div>
	  )
	}
}

class NewTodoItem extends React.Component {
    constructor(props) {
      super(props)
      this.getInitState = this.getInitState.bind(this)
      this.handleAddClick = this.handleAddClick.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleEnterKey = this.handleEnterKey.bind(this)
      this.state = this.getInitState()
    }

  getInitState() {
    return {value: ''}
  }  

	handleAddClick(event) {
      if(this.props.handleAddTodo) {
        this.props.handleAddTodo(this.state.value)
        this.setState(this.getInitState())
      }
	}

  handleEnterKey(event) {
    if(event.keyCode == 13) {
      this.handleAddClick(event)
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

	render() {
	  return (
	    <div style={{width: "100%"}}>
	      <input type='text' style={{flexGrow: 1}} onChange={this.handleChange} onKeyDown={this.handleEnterKey} value={this.state.value}/>
	      <button onClick={this.handleAddClick}>+</button>
	    </div>
	  )
	}
}

ReactDOM.render(
  <TodoList/>,
  document.getElementById('content')
);