import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

export class UpdateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        id: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
        id_role: '',
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

    if (name == 'id')
    {
      this.state.data.forEach(element => {
        if (element.id == this.state.formValues.id) {
          let dataToSet = {
            id: element.id,
            name: element.name,
            lastName: element.lastname,
            email: element.email,
            phone: element.phone,
            id_role: element.idRrole,
            password: element.password
          }
          this.setState({ formValues: dataToSet });
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.formValues.id_role);
    
    fetch("http://localhost:51424/api/Users/updateUser/" + this.state.formValues.id , {
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
    fetch("http://localhost:51424/api/users/getAllUsers", {
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
              id: json[0].id,
              name: json[0].name,
              lastName: json[0].lastname,
              email: json[0].email,
              phone: json[0].phone,
              id_role: json[0].idRole,
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
        <h4> Usuario a Actualizar </h4>
        <Input type="select" ref="user" onChange={this.handleChange('id')}  >
          {
            this.state.data.map(user => {
              return (
                <React.Fragment>
                  <option value={user.id}> {user.name}  </option>
                  <option hidden value={user.lastName}> {user.lastname} </option>
                </React.Fragment>
              );

            })
          }
        </Input>
        <br></br>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <h3> Actualizar Usuario </h3>

          <Label> Id </Label>
          <Input readOnly value={this.state.formValues.id} ></Input>

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
            <Input type="select" for="id_role" onChange={this.handleChange('id_role')} value={this.state.formValues.id_role} >Rol
              <option value='1'> Administrador </option>
              <option value='2'> Profesional </option>
            </Input>
          </FormGroup>

          <Input type="submit" value="Actualizar" />
        </Form>
      </div>
    );
  }
}
