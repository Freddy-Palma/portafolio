import React, { Component } from "react";
//import { LoginScreen } from 'react-navigation-stack';
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Redirect } from "react-router-dom";
import Session from "./Session";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        run: "",
        password: "",
        id_role: ""
      },
      isLogged: false
    };
  }

  static navigationOptions = {
    //title: 'Welcome',
    header: { visible: false }
  };

  handleChange = name => event => {
    const { formValues } = this.state;
    formValues[name] = event.target.value;
    this.setState({ formValues });
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:51424/api/users/login", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => response.json())
      .then(json => {
        const newFormValues = { ...this.state.formValues };
        newFormValues.id_role = json.rol;
        this.setState({
          formValues: newFormValues,
          isLogged: json.success
        });
        const { run } = this.state.formValues;
        Session.start({ run});
      });
  }

  render() {
    if (this.state.isLogged && this.state.formValues.id_role == 1) {
      return <Redirect to="/Home" />;
    } else {
      if (this.state.isLogged && this.state.formValues.id_role == 2) {
        return <Redirect to="/HomeProfesional" />;
      } else {
        if (this.state.isLogged && this.state.formValues.id_role == 3) {
          return <Redirect to="/HomeClient" />;
        }
      }
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <h1> Iniciar Sesión </h1>
          <FormGroup>
            <Label for="run">RUN</Label>
            <Input
              type="number"
              required
              name="run"
              id="run"
              placeholder="run"
              onChange={this.handleChange("run")}
              value={this.state.formValues.run}
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
              onChange={this.handleChange("password")}
              value={this.state.formValues.password}
            />
          </FormGroup>

          <Input type="submit" value="Iniciar Sesión" />
        </Form>
      </div>
    );
  }
}
