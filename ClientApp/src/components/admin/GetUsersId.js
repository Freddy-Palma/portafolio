import React, { Component,Step1,Step2 } from 'react';
import { Table,Form,FormGroup,Label,Input,Button} from 'reactstrap';
import { timingSafeEqual } from 'crypto';
//import { Form } from 'reactstrap';

export class GetUsersId extends Component {

  constructor(props){
    super(props);
    this.state = {
        formValues : {
            id : ''
        },
        data : [

        ]}
    }

    handleChange = (name) => (event) => {
        const { formValues } = this.state;
        formValues[name] = event.target.value;
        this.setState({ formValues });
    }

    handleSubmit(event){ 
        event.preventDefault();
        fetch("http://localhost:51424/api/users/getUser/"+this.state.formValues.id, {
          method: 'get',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.id)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ 
            data : json 
        }));
    }

    handleSubmitDelete(event){ 
        event.preventDefault();
        fetch("http://localhost:51424/api/users/deleteUsers/"+this.state.formValues.id, {
          method: 'post',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.id)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ 
            data : [],
            id : ''
        }));
    }

    render () 
    {
        const roles = {
            1: "Administrador",
            2: "Profesional",
            3: "Cliente"
        }

        return(
            <div>
                <div1>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <h1> Buscar </h1>            
                        <FormGroup>
                            <Label for="id">ID</Label>
                            <Input 
                            type="id" 
                            required 
                            name="id" 
                            id="id" 
                            placeholder="id" 
                            onChange={this.handleChange('id')} 
                            value={this.state.formValues.id}
                            />
                        </FormGroup>
                        <Input type="submit" value="Buscar" />
                    </Form>
                </div1>
                <div2>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Telefono</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map(element => {
                                    return (
                                        <tr>
                                            <td>{ element.id }</td>
                                            <td>{ element.name }</td>
                                            <td>{ element.lastname }</td>
                                            <td>{ element.email }</td>
                                            <td>{ roles[element.idRole]  }</td>
                                            <td>{ element.phone }</td>
                                        </tr>
                                    );
                                    
                                })
                            }
                        </tbody>
                    </Table>
                </div2> 
                <div3>
                    <Button onClick={ this.handleSubmitDelete.bind(this)}>
                            Eliminar
                    </Button>
                </div3>
            </div>
        );
    }
}
