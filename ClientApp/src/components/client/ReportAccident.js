import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import Session from '../auth/Session';

export class ReportAccident extends Component {

    constructor(props){
      super(props);
      this.state = {
        formValues: {
          name: '',
          severity: '',
          date_accident: '',
          resumen: '',
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
        fetch("http://localhost:51424/api/Accidents/registerAccident", {
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
        <h1> Registre el Accidente </h1>            
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
            <Label> Gravedad </Label>
            <Input type="select" ref="severity" onChange={this.handleChange('severity')}  >
            {
                <React.Fragment>
                <option value="high"> Alta  </option>
                <option value="medium"> Media  </option>
                <option value="low"> Baja  </option>
                </React.Fragment>
            }
            </Input>
        </FormGroup>

        <FormGroup>
            <Label for="date">Fecha</Label>
            <Input 
              type="date" 
              required 
              name="date" 
              id="date" 
              //placeholder="email@email.cl" 
              onChange={this.handleChange('date_accident')} 
              value={this.state.formValues.date_accident} 
            />
        </FormGroup>
       
        <FormGroup>
            <Label for="resumen">Resumen</Label>
            
            <Input 
              type="text area" 
              required 
              name="resumen" 
              id="resumen" 
              placeholder="Resumen" 
              onChange={this.handleChange('resumen')} 
              value={this.state.formValues.resumen}
            />
        </FormGroup>
      
        <FormGroup>
            <h4> Empresa</h4>
            <Input type="select" ref="company" onChange={this.handleChange('id_company')}   >
            {
                this.state.data.map(company => {
                    return (
                        <React.Fragment>
                        <option value={company.rut}> {company.socialReason}  </option>
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