import React, { Component,Step1,Step2 } from 'react';
import { Table,Form,FormGroup,Label,Input,Button} from 'reactstrap';
import { timingSafeEqual } from 'crypto';
//import { Form } from 'reactstrap';

export class GetContractRut extends Component {

  constructor(props){
    super(props);
    this.state = {
        formValues : {
            rut_company : '',
            id: ''
        },
        id_company: '',
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
        fetch("http://localhost:51424/api/Contracts/getContract/"+this.state.formValues.rut_company, {
          method: 'get',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.rut)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ 
            data : json,
            id_company: json.id           
        }));
    }

    handleSubmitDelete(event){ 
        event.preventDefault();
        fetch("http://localhost:51424/api/Contracts/deleteContract/"+this.state.id_company, {
          method: 'post',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(this.state.id_company)
        })
        .then((response) => response.json())
        .then((json) => this.setState({ 
            data : []
        }));
    }

    render () 
    {
        return(
            <div>
                <div1>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <h1> Buscar Contrato </h1>            
                        <FormGroup>
                            <Label for="rut">RUT</Label>
                            <Input 
                            type="text" 
                            required 
                            name="rut" 
                            id="rut" 
                            placeholder="rut" 
                            onChange={this.handleChange('rut_company')} 
                            value={this.state.formValues.rut_company}
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
                        <th>Precio</th>
                        <th>Cantidad de Visitas</th>
                        <th>Cantidad de Asesorías</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(element => {
                                return (
                                    <tr>
                                        <td>{ element.rutCompany }</td>
                                        <td>{ element.price }</td>
                                        <td>{ element.numberVisit }</td>
                                        <td>{ element.numberAsesory }</td>
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