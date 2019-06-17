import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class FormOnSubmitAuthor extends Component {

  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    var self = this;
    self.props.onAuthorSet(self.state.name);
    self.setState({ name: '' })
  };

  render() {
    const { name } = this.state

    if(this.props.isAuthorChange){
      return (
        <Form onSubmit={this.handleSubmit} className='author'>
          <Form.Group className='author'>
            <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} className='author' />
            <Form.Button content='Submit' className='author' />
          </Form.Group>
        </Form>
      );
    }
    else{
      return null;
    }
  }
}

class ButtonAuthorToggle extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    let self = this;
    self.setState(prevState => ({ active: !prevState.active }))
    self.props.onAuthorSet('')
  }

  render() {
    const { active } = this.state
    if(this.props.isAuthorChange){
      return null;
    }
    else{
      return (
        <div class="Author">
          <Button toggle active={active} onClick={this.handleClick}>
            Current User: {this.props.author}
          </Button>
        </div>
      )
    }
  }
}

export {
  FormOnSubmitAuthor,ButtonAuthorToggle,
}
