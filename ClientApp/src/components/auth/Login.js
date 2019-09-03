import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      formValues: {
        email: '',
        password: ''
      },
      isLogged: false
    }
}

handleChange = (name) => (event) => {
  const { formValues } = this.state;
  formValues[name] = event.target.value;
  this.setState({ formValues });
}

handleSubmit(event){ 
    event.preventDefault();
    fetch("http://localhost:51424/api/users/login", {
      method: 'post',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state.formValues)
    })
    .then((response) => response.json())
    .then((json) => this.setState({ isLogged: json.success}));
};

  render () {
    if (this.state.isLogged) {
      return <Redirect to='/' />
    }
    
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <h1> Iniciar Sesión </h1>            
            <FormGroup>
                <Label for="email">Email</Label>
                <Input 
                  type="email" 
                  required
                  name="email" 
                  id="email" 
                  placeholder="email@email.cl" 
                  onChange={this.handleChange('email')}
                  value={this.state.formValues.email}
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">Contraseña</Label>
                <Input 
                  type="password" 
                  required
                  name="password" 
                  id="password" 
                  placeholder="****" 
                  onChange={this.handleChange('password')} 
                  value={this.state.formValues.password} 
                />
            </FormGroup>
        
            <Input type="submit" value="Iniciar Sesión" />
      </Form>
      </div>
    );
  }
}
