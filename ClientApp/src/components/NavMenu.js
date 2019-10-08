import React, { Component } from "react";
import { Label } from "reactstrap";
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
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
//import Session from '';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {

    const navItem = {
      'Administrador': 1,
      'Profesional': 2,
      'Cliente' : 3
    }

    return (
      
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/Home">
              Inicio
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/Home">
                    Inicio
                  </NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Usuarios
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/register">
                        {" "}
                        Registro
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/getAllUsers"
                      >
                        {" "}
                        Ver Usuarios
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/getUsersId"
                      >
                        {" "}
                        Buscar un usuario
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/updateUser"
                      >
                        {" "}
                        Actualizar usuario
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Cliente
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/registerCompany"
                      >
                        {" "}
                        Registrar Empresa
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/getAllCompanies"
                      >
                        {" "}
                        Ver Clientes
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/getCompanyRut"
                      >
                        {" "}
                        Buscar Cliente
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/updateCompany"
                      >
                        {" "}
                        Actualizar Cliente
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Contrato
                  </DropdownToggle>
                  <DropdownMenu right>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/doContract"
                      >
                        {" "}
                        Realizar un Contrato
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/getAllContracts"
                      >
                        {" "}
                        Ver Contratos
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/getContractRut"
                      >
                        {" "}
                        Buscar Contrato
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/updateContract"
                      >
                        {" "}
                        Actualizar Contrato
                      </NavLink>
                    </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Cliente Acciones
                  </DropdownToggle>
                  <DropdownMenu right>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/reportAccident"
                      >
                        {" "}
                        Reportar Accidente
                      </NavLink>
                    </DropdownItem>

                    <DropdownItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/requestActivities"
                      >
                        {" "}
                        Solicitar Actividad
                      </NavLink>
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
