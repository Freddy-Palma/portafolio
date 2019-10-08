import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

export class UpdateCompany extends Component {

  constructor(props) {
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
      data: [

      ],
      isUpdate: false,
      isFound: false
    }
  }

  handleChange = (name) => (event) => {
    //console.log("llegue");
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });

    if (name == 'rut')
    {
      this.state.data.forEach(element => {
        if (element.rut == this.state.formValues.rut) {
          let dataToSet = {
            rut: element.rut,
            social_reason: element.socialReason,
            email: element.email,
            address: element.address,
            comercial_business: element.comercialBusiness,
            phone: element.phone,
            password: element.password
          }
          this.setState({ formValues: dataToSet });
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state.formValues.rut);
    
    fetch("http://localhost:51424/api/Companies/updateCompany/" + this.state.formValues.rut , {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.formValues)
    })
      .then((response) => response.json())
      .then((json) => this.setState({ isUpdate: json.success }));
      
  };

  componentWillMount() {
    //event.preventDefault();
    fetch("http://localhost:51424/api/Companies/getAllcompanies", {
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
              rut: json[0].rut,
              social_reason: json[0].socialReason,
              email: json[0].email,
              address: json[0].address,
              comercial_business: json[0].comercialBusiness,
              phone: json[0].phone,
              password: json[0].password
            }
          })
      }
      )
      .catch(e => console.log(e.message)
      );
  }

  render() {
    if (this.state.isUpdate) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h4> Empresa a Actualizar </h4>
        <Input type="select" ref="company" onChange={this.handleChange('rut')}  >
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
        <br></br>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <h3> Actualizar Empresa </h3>

          <Label> Rut </Label>
          <Input readOnly value={this.state.formValues.rut} ></Input><br></br>

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
              placeholder="email"
              onChange={this.handleChange('email')}
              value={this.state.formValues.email}
            />
          </FormGroup>

          <FormGroup>
            <Label for="address">Direccion</Label>
            <Input
              type="text"
              required
              name="address"
              id="address"
              placeholder="Dirección"
              onChange={this.handleChange('address')}
              value={this.state.formValues.address}
            />
          </FormGroup>

          <FormGroup>
            <Label for="comercial_business">Giro Comercial</Label>
            <Input
              type="text"
              required
              name="comercial_business"
              id="comercial_business"
              placeholder="comercial_business"
              onChange={this.handleChange('comercial_business')}
              value={this.state.formValues.comercial_business}
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

          <Input type="submit" value="Actualizar" />
        </Form>
      </div>
    );
  }
}
