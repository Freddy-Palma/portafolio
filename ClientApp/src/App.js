import React, { Component } from 'react';
import { ReactStrap } from 'reactstrap';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { GetAllUsers } from './components/admin/GetAllUsers';
import { UpdateUser } from './components/admin/UpdateUser';

export default class App extends Component {
  //static displayName = App.name();

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/login' component={Login} />
        <Route path='/getAllUsers' component={GetAllUsers} />
        <Route path='/updateUser' component={UpdateUser} />

      </Layout>
    );
  }
}
