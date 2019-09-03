import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

export class Register extends Component {

    constructor(props){
      super(props);
      this.state = {
        formValues: {
          name: '',
          lastName: '',
          email: '',
          phone: '',
          id_role: '3',
          password: ''
        },
        isRegister : false
      }
    }

    handleChange = (name) => (event) => {
      const { formValues } = this.state;
      formValues[name] = event.target.value;
      this.setState({ formValues });
    }

    handleSubmit(event){ 
        event.preventDefault();
        fetch("http://localhost:51424/api/Users/register", {
          method: 'post',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.formValues)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ isLogged: json.success}));
    };

  render () {

    if (this.state.isRegister)
    {
      return <Redirect to='/'/>
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
        <h1> Registrate </h1>            
        <FormGroup>
            <Label for="name">Nombre</Label>
            <Input 
              type="text" 
              required 
              name="name" 
              id="name" 
              placeholder="Nombre" 
              onChange={this.handleChange('name')} 
              value={this.state.formValues.name}
            />
        </FormGroup>

        <FormGroup>
            <Label for="lastName">Apellido</Label>
            <Input 
              type="text" 
              required 
              name="lastName" 
              id="lastName" 
              placeholder="Apellido" 
              onChange={this.handleChange('lastName')} 
              value={this.state.formValues.lastName}
              />
        </FormGroup>

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
            <Label for="phone">Telefono</Label>
            <Input 
              type="number" 
              required 
              name="phone" 
              id="phone" 
              placeholder="123456789" 
              onChange={this.handleChange('phone')} 
              value={this.state.formValues.phone}
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
        <input type="hidden" name="id_role" onChange={this.handleChange} value={this.state.formValues.id_role}></input>
        <Input type="submit" value="Submit" />
      </Form>
      <Label> ¿Tienes una cuenta? </Label>
      <Link to={'/login'}> Ingresa acá </Link>
      </div>
    );
  }
}
// 