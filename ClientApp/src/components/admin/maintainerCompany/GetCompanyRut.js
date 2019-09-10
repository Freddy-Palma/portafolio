import React, { Component,Step1,Step2 } from 'react';
import { Table,Form,FormGroup,Label,Input,Button} from 'reactstrap';
import { timingSafeEqual } from 'crypto';
//import { Form } from 'reactstrap';

export class GetCompanyRut extends Component {

  constructor(props){
    super(props);
    this.state = {
        formValues : {
            rut : ''
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
        fetch("http://localhost:51424/api/companies/getCompanyRut/"+this.state.formValues.rut, {
          method: 'get',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.rut)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ 
            data : json 
        }));
    }

    handleSubmitDelete(event){ 
        event.preventDefault();
        fetch("http://localhost:51424/api/companies/deleteCompany/"+this.state.formValues.rut, {
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
        return(
            <div>
                <div1>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <h1> Buscar </h1>            
                        <FormGroup>
                            <Label for="rut">RUT</Label>
                            <Input 
                            type="text" 
                            required 
                            name="rut" 
                            id="rut" 
                            placeholder="rut" 
                            onChange={this.handleChange('rut')} 
                            value={this.state.formValues.rut}
                            />
                        </FormGroup>
                        <Input type="submit" value="Buscar" />
                    </Form>
                </div1>
                <div2>
                <Table>
                    <thead>
                    <tr>
                        <th>RUT</th>
                        <th>Razón Social</th>
                        <th>Email</th>
                        <th>Direccion</th>
                        <th>Giro Comercial</th>
                        <th>Telefono</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(element => {
                                return (
                                    <tr>
                                        <td>{ element.rut }</td>
                                        <td>{ element.socialReason }</td>
                                        <td>{ element.email }</td>
                                        <td>{ element.address }</td>
                                        <td>{ element.comercialBusiness  }</td>
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
