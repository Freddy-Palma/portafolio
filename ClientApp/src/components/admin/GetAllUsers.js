import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class GetAllUsers extends Component {

  constructor(props){
    super(props);
    this.state = {
        data : [

        ]},
        console.log(this);
    }

    componentWillMount(){
        //event.preventDefault();
        fetch("http://localhost:51424/api/users/getAllUsers", {
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

        const roles = {
            1: "Administrador",
            2: "Profesional",
            3: "Cliente"
        }

        return (
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
        );
    }
}
