import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class GetAllCompanies extends Component {

  constructor(props){
    super(props);
    this.state = {
        data : [

        ]},
        console.log(this);
    }

    componentWillMount(){
        fetch("http://localhost:51424/api/companies/getAllCompanies", {
        method: 'get',
        mode: 'cors',
        })
        .then((response) => response.json())
        .then((json) => this.setState({
            data: json
        }))
        .catch( e => console.log(e.message)
        );
        console.log(this.state.data);
    }

    render () 
    {
        return (
            <React.Fragment>
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
            </React.Fragment>
           
        );
    }
}
