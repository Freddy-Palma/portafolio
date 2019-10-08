import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

export class RegisterCompany extends Component {

    constructor(props){
      super(props);
      this.state = {
        formValues: {
          rut: '',
          social_reason: '',
          email: '',
          address: '',
          comercial_business: '',
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
        fetch("http://localhost:51424/api/Companies/register", {
          method: 'post',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.formValues)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ isRegister: json.success}));
    };

    componentWillMount() {
      //event.preventDefault();
      fetch("http://localhost:51424/api/users/getAllUsersClient", {
        method: 'get',
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((json) => {
          //console.log(json[0].id);
          this.setState(
            {
              data: json,
              formValues: {
                run_client: json[0].rut
              }
            })
        }
        )
        .catch(e => console.log(e.message)
        );
    }

  render () {

    if (this.state.isRegister)
    {
      return <Redirect to='/'/>
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
        <h1> Registra la Empresa </h1>            
        <FormGroup>
            <Label for="rut">RUT</Label>
            <Input 
              type="number" 
              required 
              name="rut" 
              id="rut" 
              placeholder="RUT" 
              onChange={this.handleChange('rut')} 
              value={this.state.formValues.rut}
            />
        </FormGroup>

        <FormGroup>
            <Label for="social_reason">Razón Social</Label>
            <Input 
              type="text" 
              required 
              name="social_reason" 
              id="social_reason" 
              placeholder="Razón Social" 
              onChange={this.handleChange('social_reason')} 
              value={this.state.formValues.social_reason}
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
            <Label for="address">Dirección</Label>
            <Input 
              type="text" 
              required 
              name="address" 
              id="text" 
              placeholder="Dirección" 
              onChange={this.handleChange('address')} 
              value={this.state.formValues.address}
            />
        </FormGroup>
      
        <FormGroup>
            <Label for="comercial_business">Giro comercial</Label>
            <Input 
              type="text"
              required 
              name="comercial_business" 
              id="comercial_business" 
              placeholder="Giro comercial" 
              onChange={this.handleChange('comercial_business')} 
              value={this.state.formValues.comercial_business}
            />
        </FormGroup>

        <FormGroup>
            <Label for="phone">Teléfono</Label>
            <Input 
              type="number"
              required 
              name="phone" 
              id="phone" 
              placeholder="56930799532" 
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
        <Input type="submit" value="Registrar" />
      </Form>
      </div>
    );
  }
}
// 