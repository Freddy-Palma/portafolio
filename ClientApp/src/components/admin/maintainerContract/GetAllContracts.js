import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class GetAllContracts extends Component {

  constructor(props){
    super(props);
    this.state = {
        data : [

        ]},
        console.log(this);
    }

    componentWillMount(){
        //event.preventDefault();
        fetch("http://localhost:51424/api/Contracts/getAllContracts", {
        method: 'get',
        mode: 'cors',
        })
        .then((response) => response.json())
        .then((json) => this.setState({
            data: json
        }))
        .catch( e => console.log(e.message)
        );
    }

    render () 
    {

        return (
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
        );
    }
}
