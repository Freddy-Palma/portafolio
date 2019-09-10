import React, { Component } from 'react';
import { 
  Collapse, 
  Container, 
  Navbar, 
  NavbarBrand, 
  NavbarToggler, 
  NavItem, 
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Inicio</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Inicio</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/registerCompany"> Registrar Empresa</NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Usuarios
                  </DropdownToggle>
                  <DropdownMenu right>

                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/register"> Registro</NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/getAllUsers"> Ver Usuarios</NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/getUsersId"> Buscar un usuario</NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/updateUser"> Actuliazar usuario</NavLink>
                    </DropdownItem>

                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Empresa
                  </DropdownToggle>
                  <DropdownMenu right>

                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/getAllCompanies"> Ver Clientes</NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/getCompanyRut"> Buscar Cliente</NavLink>
                    </DropdownItem>

                  </DropdownMenu>
                </UncontrolledDropdown>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
