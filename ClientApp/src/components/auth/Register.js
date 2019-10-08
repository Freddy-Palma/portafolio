import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

export class Register extends Component {

    constructor(props){
      super(props);
      this.state = {
        formValues: {
          run:'',
          name: '',
          lastName: '',
          email: '',
          phone: '',
          id_role: '1',
          password: ''
        },
        isRegister : false
      }
    }

    handleChange = (name) => (event) => {
      console.log(this.state.formValues.id_role);
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
        .then((json) => this.setState({ isRegister: json.success}));
    };

  render () {

    if (this.state.isRegister)
    {
      return <Redirect to='/'/>
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
        <h1> Registra un Usuario </h1>  

        <FormGroup>
            <Label for="run">RUN</Label>
            <Input 
              type="number" 
              required 
              name="run" 
              id="run" 
              placeholder="RUN" 
              onChange={this.handleChange('run')} 
              value={this.state.formValues.run}
            />
        </FormGroup>

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

        <FormGroup>
            <Label>Rol</Label>
            <Input type="select" for="id_role" onChange={this.handleChange('id_role')}  value={this.state.formValues.id_role} >Rol
              <option value='1'> Administrador </option>
              <option value='2'> Profesional </option>
            </Input>
            
        </FormGroup>
        <Input type="submit" value="Crear" />
      </Form>
      {/* <Label> ¿Tienes una cuenta? </Label> */}
      {/* <Link to={'/login'}> Ingresa acá </Link> */}
      </div>
    );
  }
}
