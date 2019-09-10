import React, { Component } from 'react';
import { ReactStrap } from 'reactstrap';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { GetAllUsers } from './components/admin/GetAllUsers';
import { UpdateUser } from './components/admin/UpdateUser';
import { RegisterCompany } from './components/admin/RegisterCompany';
import { GetUsersId } from './components/admin/GetUsersId';
import { GetAllCompanies } from './components/admin/maintainerCompany/GetAllCompanies';
import { GetCompanyRut } from './components/admin/maintainerCompany/GetCompanyRut';


export default class App extends Component {
  //static displayName = App.name();

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/getAllUsers' component={GetAllUsers} />
        <Route path='/updateUser' component={UpdateUser} />
        <Route path='/registerCompany' component={RegisterCompany} />
        <Route path='/getUsersId' component={GetUsersId} />
        <Route path='/getAllCompanies' component={GetAllCompanies} />
        <Route path='/getCompanyRut' component={GetCompanyRut} />
      </Layout>
    );
  }
}
