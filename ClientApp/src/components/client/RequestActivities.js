import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import Session from "../auth/Session";

export class RequestACtivities extends Component {

    constructor(props){
      super(props);
      this.state = {
        formValues: {
          name: '',
          type: '',
          id_company: ''
        },
        data : [

        ],
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
        fetch("http://localhost:51424/api/RequestActivities/registerRequestActivities", {
          method: 'post',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.formValues)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ isRegister: json.success}));

      
    };

    componentWillMount() {
        const run = Session.getUser().run;
        console.log(run);
        fetch("http://localhost:51424/api/companies/getCompanyRut/" + run, {
          method: 'get',
          mode: 'cors',
        })
          .then((response) => response.json())
          .then((json) => {
            const newFormValues = { ...this.state.formValues };
            newFormValues.id_company = json.rut;
            this.setState(
              {
                data: json,
                formValues: newFormValues 
              })
          }
          )
          .catch(e => console.log(e.message)
          );
      }

  render () {

    if (this.state.isRegister)
    {
      return <Redirect to='/homeClient'/>
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
        <h1> Solicite la Actividad Extra </h1>            
        <FormGroup>
            <Label for = "name">Nombre</Label>
            <Input 
              type = "text" 
              required 
              name = "name" 
              id = "name" 
              placeholder = "Nombre" 
              onChange = {this.handleChange('name')} 
              value = {this.state.formValues.name}
            />
        </FormGroup>

        <FormGroup>
            <Label> Tipo </Label>
            <Input type="select" ref="type" onChange={this.handleChange('type')} required >
            {
                <React.Fragment>
                <option disabled selected value> Seleccione una opción </option>
                <option value="asesory"> Asesoría  </option>
                <option value="visit"> Visita  </option>
                </React.Fragment>
            }
            </Input>
        </FormGroup>
      
        <FormGroup>
            <h4> Empresa </h4>
            <Input type="select" ref="company" onChange={this.handleChange('id_company')}   >
            {
                this.state.data.map( ( company, i ) => {
                    return (
                        <React.Fragment>
                        <option key = { i } value = {company.rut}> {company.socialReason}  </option>
                        </React.Fragment>
                    );
                })
            }
            </Input>
        </FormGroup>

        <Input type="submit" value="Reportar" />
      </Form>
      </div>
    );
  }
}
// 