import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

export class UpdateContract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        rut_company: '',
        price: '',
        number_visit: '',
        number_asesory: '',
        id: ''
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

    if (name == 'rut_company')
    {
      this.state.data.forEach(element => {
        if (element.rutCompany == this.state.formValues.rut_company) {
          let dataToSet = {
            rut_company: element.rutCompany,
            price: element.price,
            number_visit: element.numberVisit,
            number_asesory: element.numberAsesory
          }
          this.setState({ formValues: dataToSet });
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state.formValues.rut);
    
    fetch("http://localhost:51424/api/Contracts/updateContract/" + this.state.formValues.id , {
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
    fetch("http://localhost:51424/api/Contracts/getAllContracts", {
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
              rut_company: json[0].rutCompany,
              price: json[0].price,
              number_visit: json[0].numberVisit,
              number_asesory: json[0].numberAsesory,
              id: json[0].id
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
        <h4> Contracto a Actualizar </h4>
        <Input type="select" ref="company" onChange={this.handleChange('rut')}  >
          {
            this.state.data.map(company => {
              return (
                <React.Fragment>
                  <option value={company.rutCompany}> {company.rutCompany}  </option>
                </React.Fragment>
              );

            })
          }
        </Input>
        <br></br>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <h3> Actualizar Contrato </h3>

          <Label> Rut </Label>
          <Input readOnly value={this.state.formValues.rut_company} ></Input><br></br>

          <FormGroup>
            <Label for="price">Precio</Label>
            <Input
              type="number"
              required
              name="price"
              id="price"
              placeholder="Precio"
              onChange={this.handleChange('price')}
              value={this.state.formValues.price}
            />
          </FormGroup>

          <FormGroup>
            <Label for="number_visit">Cantidad de Visitas</Label>
            <Input
              type="number"
              required
              name="number_visit"
              id="number_visit"
              placeholder="Cantidad de Visitas"
              onChange={this.handleChange('number_visit')}
              value={this.state.formValues.number_visit}
            />
          </FormGroup>

          <FormGroup>
            <Label for="number_asesory">Cantidad de Asesorias</Label>
            <Input
              type="number"
              required
              name="number_asesory"
              id="number_asesory"
              placeholder="Cantidad de Asesorías"
              onChange={this.handleChange('number_asesory')}
              value={this.state.formValues.number_asesory}
            />
          </FormGroup>

          <Input type="submit" value="Actualizar" />
        </Form>
      </div>
    );
  }
}
