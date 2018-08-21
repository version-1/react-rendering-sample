import React, { Component, PureComponent } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1,
      a: false,
      b: false,
      c: false,
    }
    
    this.increment = this.increment.bind(this)
  }
  
  increment() {
    this.setState({counter: this.state.counter + 1 })
  }

  change(key) {
    this.setState({ [key]: !this.state[key] })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className="buttons">
          <div className="flex">
            <button className="btn btn-default" onClick={this.increment} >{"+"}</button>
          </div>
          <div className="flex">
            <button className="btn btn-default btn-a" onClick={this.change.bind(this, 'a')} >a</button>
            <button className="btn btn-default btn-b" onClick={this.change.bind(this, 'b')} >b</button>
            <button className="btn btn-default btn-c" onClick={this.change.bind(this, 'c')} >c</button>
          </div>
        </div>
        <ParentComponent
          counter={this.state.counter}
          increment={this.increment}
          a={this.state.a}
          b={this.state.b}
          c={this.state.c}
        />
      </div>
    );
  }
}


class ParentComponent extends Component {
  
  callback() {
  }

  render() {
    console.log('ParentComponent')
    const { a, b, c, counter, increment } = this.props
    return (
      <div className="parent-component">
        <h2>Parent Component</h2>
        <ChildrenComponent increment={increment} counter={counter} value={a}/>
        <ChildrenPureComponent increment={increment} callback={this.callback} counter={counter} value={b}/>
        <SFCComponent increment={increment} counter={counter} value={c}/>
      </div>
    )
  }
}

class ChildrenComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
  }

  onClick() {
    this.setState({ toggle: !this.state.toggle})
  }

  render () {
    console.log('ChildrenComponent')
    const { counter, value, increment } = this.props
    const { toggle } = this.state
    return (
      <div className="children-component">
        <h3 onClick={this.onClick.bind(this)}>Component</h3>
        <div onClick={increment}>counter : <span>{counter}</span></div>
        <div>flg : <span>{value.toString()}</span></div>
        <div>toggle : <span>{toggle.toString()}</span></div>
      </div>
    )
  }
}

class ChildrenPureComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
  }

  onClick() {
    this.setState({ toggle: !this.state.toggle})
  }

  render () {
    console.log('ChildrenPureComponent')
    const { counter, value, increment } = this.props
    const { toggle } = this.state
    return (
      <div className="children-pure-component">
        <h3 onClick={this.onClick.bind(this)}>Pure Component</h3>
        <div onClick={increment}>counter : <span>{counter}</span></div>
        <div>flg : <span>{value.toString()}</span></div>
        <div>toggle : <span>{toggle.toString()}</span></div>
      </div>
    )
  }
}

const SFCComponent = (props) => {
  console.log('SFCComponent')
  return (
    <div className="sfc">
      <h3>SFC component</h3>
      <div onClick={props.increment}>counter : <span>{props.counter}</span></div>
      <div>flg : <span>{props.value.toString()}</span></div>
    </div>
  )
}

export default App;
